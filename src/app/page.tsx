import { auth } from "@/auth";
import { SignOut } from "@/components/sign-out";
import { Card } from "@/components/ui/card";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { getStarredReposForOrg } from "@/lib/github";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const id = session.user.id;

  if (!id) {
    return <div>No ID</div>;
  }
  const userDb = await db.query.users.findFirst({
    where: eq(schema.users.id, id),
    with: {
      accounts: {
        columns: { access_token: true },
        limit: 1,
      },
    },
  });

  if (!userDb || userDb.accounts.length === 0) {
    return <div>No user in db</div>;
  }

  const access_token = userDb.accounts[0].access_token;

  if (!access_token) {
    return <div>No access token</div>;
  }
  const name = session.user.name;
  console.log("USERDB", { userDb });

  const repos = await getStarredReposForOrg(access_token, "GITHUB_ORG_NAME_HERE");

  return (
    <div className="space-y-4">
      <SignOut />
      <div>Hello {name}</div>
      <h1 className="text-2xl font-bold">Starred Repositories</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <Card key={repo.id} className="p-4">
            <h2 className="font-semibold">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {repo.name}
              </a>
            </h2>
            <p className="text-sm text-gray-600">{repo.description}</p>
            <div className="mt-2 flex gap-2 text-sm">
              {repo.language && <span className="text-gray-600">{repo.language}</span>}
              <span className="text-gray-600">⭐ {repo.stars}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
