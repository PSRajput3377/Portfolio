import { NextResponse } from "next/server";
import { LEETCODE_USERNAME } from "@/lib/constants";
import type { LeetCodeStats } from "@/types";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || LEETCODE_USERNAME;

  try {
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "LeetCode API error" }, { status: 502 });
    }

    const data = await res.json();

    if (data.status !== "success") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stats: LeetCodeStats = {
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      ranking: data.ranking || 0,
      acceptanceRate: data.acceptanceRate
        ? `${data.acceptanceRate}%`
        : "N/A",
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 500 });
  }
}
