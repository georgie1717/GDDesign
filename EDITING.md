# Editing the site from your browser

You never need a terminal for this. Everything below happens on github.com, and
every change you commit is live on your site about a minute later.

Bookmark two tabs and you have the whole workflow:

- your repo: `github.com/<your-username>/georgiedoesdesign`
- your Cloudflare Pages project, for build status and rollbacks

---

## Change some text

1. In the repo, click through to the file. Case studies are in
   `src/content/work/`. Site-wide details like your email and nav are in
   `src/site.ts`. The about page text is at the top of `src/pages/about.astro`.
2. Click the **pencil icon**, top right of the file view.
3. Edit.
4. Scroll down, write a short note in the commit box ("Fix typo in outcome"),
   and click **Commit changes**.

Cloudflare picks it up automatically. Watch it in the **Deployments** tab of your
Pages project. Green tick means live.

## Add a new case study

1. Open `src/content/work/` in the repo.
2. Click **Add file > Create new file**.
3. Name it after the URL you want. `partner-cart.mdx` becomes
   `georgiedoesdesign.com/p/partner-cart`. Keep the `.mdx` on the end.
4. Open `checkout-conversion.mdx` in another tab, copy the whole thing, paste it
   in, and edit from there. That gives you a working front matter block and every
   layout component already in place.
5. Set `draft: true` in the front matter while you write. The page will not
   appear on the site until you change it to `false`.
6. **Commit changes.**

`CONTENT-GUIDE.md` in the repo is the reference for the front matter fields and
the layout blocks.

## Add images

1. Open the folder you want them in, for example
   `public/images/work/partner-cart/`. If the folder does not exist yet, it gets
   created when you upload into a path (see the tip below).
2. Click **Add file > Upload files**.
3. Drag your exported files in. You can drop several at once.
4. **Commit changes.**
5. Reference them from the top of the path in your `.mdx` file:
   `/images/work/partner-cart/hero.png`

**Tip for a new folder:** GitHub has no "create folder" button. Instead use
**Add file > Create new file** and type the full path in the name box, for
example `public/images/work/new-project/.gitkeep`. Typing a `/` creates the
folder. Then upload into it.

Sizes to export at:

| Slot            | Size          |
| --------------- | ------------- |
| Card thumbnail  | 1200 x 825px  |
| Case study hero | 1400 x 1000px |
| In-page figures | 1600px wide   |
| Portrait        | 612 x 720px   |
| Social share    | 1200 x 630px  |

Keep each file under about 400KB. PNG for UI screens, JPG for photos.

## Delete or rename something

Open the file, click the **three dots** next to the pencil, and choose **Delete
file**. To rename, click the pencil and edit the filename at the top of the
editor.

If you rename a case study that you have already shared a link to, add a line to
`public/_redirects` so the old link still works:

```
/p/old-slug  /p/new-slug  301
```

---

## Working safely: preview before it goes live

This is the part worth learning, because it means you can never break the live
site by accident.

When you commit, instead of accepting the default, choose **Create a new branch
for this commit and start a pull request**. Name the branch something like
`partner-cart`.

Cloudflare builds every branch and gives it its own private URL, something like
`partner-cart.georgiedoesdesign.pages.dev`. You will find the link in the
**Deployments** tab, or as a comment on the pull request. Check your work there.

When you are happy, open the pull request on GitHub and click **Merge pull
request**. That is what puts it live.

You can make as many commits to that branch as you like, and the preview URL
updates each time. The live site does not move until you merge.

## If something goes wrong

**A build fails.** The Deployments tab shows a red cross. Click it and read the
last few lines of the log. It names the file and line number. In an `.mdx` file
it is almost always one of two things:

- a missing blank line after an opening tag or before a closing tag
- a stray `{` or `}` in your copy, which `.mdx` treats as code. Write `\{`
  instead

Fix the file, commit again. A failed build does not affect the live site, it just
does not replace it.

**Something looks wrong on the live site.** In Cloudflare, **Deployments**, find
the last good build, click the three dots and choose **Rollback to this
deployment**. The site reverts immediately. Then fix the file properly.

---

## When you want more than a text box

Press the **full stop key** while looking at your repo on github.com. That opens
the whole project in a full VS Code editor in your browser, with the file tree,
search across files, and multi-file editing. Still no install, still free.

You commit from the Source Control panel on the left. It is the same repo, so it
works alongside everything above.

Useful when you are restructuring a case study, or editing the CSS and the
markdown at the same time.

---

## What lives where, in one table

| I want to change                          | File                                |
| ----------------------------------------- | ----------------------------------- |
| My email, nav links, CV link              | `src/site.ts`                       |
| The home page headline and intro          | `src/pages/index.astro`             |
| The about page text and skills lists      | `src/pages/about.astro`             |
| A case study                              | `src/content/work/<slug>.mdx`       |
| Colours, type sizes, spacing, page width  | `src/styles/global.css`             |
| My logo                                   | `src/components/Logo.astro`         |
| The footer                                | `src/components/Footer.astro`       |
| My CV file                                | `public/georgie-hewitt-cv.pdf`      |
| Which case study shows first              | the `order` number in its front matter |
