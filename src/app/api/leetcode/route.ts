import { NextResponse } from "next/server";
import { LEETCODE_USERNAME } from "@/lib/constants";
import type { LeetCodeStats } from "@/types";

export const revalidate = 3600;

const QUERY = `query userStats($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty submissions }
    }
    profile { ranking }
  }
}`;

type SubmissionEntry = { difficulty: string; count?: number; submissions?: number };

const findAll = (entries: SubmissionEntry[] | undefined) =>
  entries?.find((e) => e.difficulty === "All");

const countFor = (entries: SubmissionEntry[] | undefined, difficulty: string) =>
  entries?.find((e) => e.difficulty === difficulty)?.count ?? 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || LEETCODE_USERNAME;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // LeetCode rejects requests without a browser-like Referer.
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "LeetCode API error" }, { status: 502 });
    }

    const json = await res.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const ac = user.submitStats?.acSubmissionNum as SubmissionEntry[] | undefined;
    const total = user.submitStats?.totalSubmissionNum as SubmissionEntry[] | undefined;

    // Acceptance rate = accepted submissions / total submissions (across all difficulties).
    const acceptedSubs = findAll(ac)?.submissions ?? 0;
    const totalSubs = findAll(total)?.submissions ?? 0;
    const acceptanceRate =
      totalSubs > 0 ? `${Math.round((acceptedSubs / totalSubs) * 100)}%` : "N/A";

    const stats: LeetCodeStats = {
      totalSolved: countFor(ac, "All"),
      easySolved: countFor(ac, "Easy"),
      mediumSolved: countFor(ac, "Medium"),
      hardSolved: countFor(ac, "Hard"),
      ranking: user.profile?.ranking ?? 0,
      acceptanceRate,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
