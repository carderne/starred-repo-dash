# starred-repo-dash

Built a basic Nextjs dashboard to show all your starred repos within an Organisation (i.e. your job) because GitHub doesn't support this.

But it requires the full read-write `repo` scope, which will be a no-go with any Org large enough to need this stupid thing.

## Stack
- Nextjs
- Auth.js
- Shadcn

## Development

```bash
npm install
```

DB setup:
```bash
npm run db:up
npm run db:push

# down and delete:
npm run db:nuke
```

Run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Before pushing:
```bash
npm run fmt
npm run lint
npm run check
```
