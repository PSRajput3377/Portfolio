import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubRepo, GitHubStats } from "@/types";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || GITHUB_USERNAME;

  try {
    const [reposRes, userRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const repos: GitHubRepo[] = await reposRes.json();
    const user = await userRes.json();

    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    const totalStars = filteredRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = filteredRepos.reduce(
      (sum, repo) => sum + ((repo as GitHubRepo & { forks_count?: number }).forks_count || 0),
      0
    );

    const languageCounts: Record<string, number> = {};
    filteredRepos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const total = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1;
    const languages: Record<string, number> = {};
    Object.entries(languageCounts).forEach(([lang, count]) => {
      languages[lang] = Math.round((count / total) * 100);
    });

    const stats: GitHubStats = {
      repos: filteredRepos,
      totalStars,
      totalForks,
      languages,
      contributions: (user.public_repos || 0) * 100 + totalStars * 10,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
