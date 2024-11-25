import { Octokit } from "octokit";

export async function getStarredReposForOrg(accessToken: string, orgName: string) {
  const octokit = new Octokit({
    auth: accessToken,
  });

  const starredRepos = [];
  let page = 1;

  while (true) {
    const response = await octokit.rest.activity.listReposStarredByAuthenticatedUser({
      per_page: 100,
      page,
      sort: "created",
      direction: "desc",
    });

    const orgRepos = response.data.filter(
      (repo) => repo.owner.login.toLowerCase() === orgName.toLowerCase(),
    );

    starredRepos.push(...orgRepos);

    // Check if we've reached the last page
    if (response.data.length < 100) break;
    page++;
  }

  return starredRepos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    topics: repo.topics,
    updatedAt: repo.updated_at,
  }));
}
