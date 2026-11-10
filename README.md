# Moodle Baselines

A public documentation site built with VitePress and published through GitHub Pages.

Website: https://jontulloch.github.io/moodle-baselines/

The documentation has been migrated from GitBook, including its page hierarchy, screenshots, report XML downloads and code examples. SQL and HTML template code blocks are preserved from the export; this migration does not validate their behaviour in Moodle.

## First publication

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Merge the starter site pull request into `main`.
4. Open **Actions** and wait for **Build and publish documentation** to finish.
5. Open the website link above. If Pages was enabled after merging, run the workflow again from the Actions tab.

Pull requests build the documentation without deploying it. Changes merged into `main` build and publish automatically. The workflow uses the repository's built-in token; no personal access token or additional service is required.

## Edit a page in your browser

1. Open the relevant `.md` file inside `docs`, or use **Edit this page on GitHub** on the website.
2. Click the pencil icon to edit it.
3. Use Markdown for headings, lists, links and images.
4. Commit your changes, or create a branch and pull request for review.

Only changes on `main` are published.

## Add a page

1. Create a Markdown file such as `docs/overview/new-topic.md`.
2. Add its title and content.
3. Add an entry to `themeConfig.sidebar` in `docs/.vitepress/config.mts`, for example:

```ts
{ text: 'New topic', link: '/overview/new-topic' }
```

4. Commit both changes together. Search will include the new page when the site rebuilds.

## Add an image

Upload an image to `docs/images` and reference it from a page in `docs/overview` like this:

```md
![A meaningful description of the screenshot](../images/example.png)
```

## Local preview (optional)

Use Node.js 22 or later. From the repository directory, run:

```sh
npm ci
npm run docs:dev
```

Build and preview the production website with:

```sh
npm run docs:build
npm run docs:preview
```

## Site settings

The title, navigation, sidebar and search settings are in `docs/.vitepress/config.mts`.
The `base` value `/moodle-baselines/` matches the repository name. Change it if you rename the repository or move to a custom domain, and adjust the `/moodle-baselines/` prefix in the XML download links at the same time.

## Migrated content

- `docs/index.md` is the Setup page.
- `docs/overview/index.md` introduces the reports.
- Each report has its own directory containing an `index.md` guide and a SQL reference page.
- `docs/public/assets/gitbook` contains the screenshots and report XML downloads used by these pages. These files are served from `/moodle-baselines/assets/gitbook/`.
- The sidebar follows the original GitBook table of contents. GitBook step blocks become numbered headings, hints become VitePress callouts, and reusable headings are included in the relevant pages.

This is a one-time migration. Later GitBook edits are not automatically copied into this site.
