# Getting the site live on georgiedoesdesign.com

Read this top to bottom. Nothing here needs a terminal.

## What you are actually setting up

Cloudflare has two ways to host a site: **Pages** (the older one) and **Workers**
(the current one). Cloudflare's dashboard now pushes you towards Workers, which
is what you have got. Workers is fine, it is the one Cloudflare is actively
developing, so we will stay on it.

The one difference that matters: **Workers needs a small settings file in your
repo. Pages did not.** That file tells Cloudflare "this is a plain static site,
and the finished files are in the `dist` folder". Without it, the deploy step has
no idea what to publish.

That file is `wrangler.json` and it is included in the project now.

---

## Before you start: protect your email

`hello@georgiedoesdesign.com` only works because of DNS records at Namecheap
(MX, and probably SPF/DKIM TXT records). Later on you move DNS to Cloudflare, and
if any of those records get missed your email silently stops arriving.

Do this now, it takes two minutes:

1. In Namecheap, go to **Domain List > georgiedoesdesign.com > Advanced DNS**.
2. Screenshot the whole record list.
3. Keep it until the new site has been live for a week.

You will compare it against Cloudflare's list in step 4.

---

## Step 1. Add the settings file to your repo

If you unzipped a fresh copy of the project, `wrangler.json` is already in it and
you can skip to step 2 after pushing it. If your repo is already on GitHub
without it, add it in the browser:

1. Go to `github.com/georgie1717/GDDesign`.
2. Click **Add file > Create new file**.
3. In the filename box type exactly: `wrangler.json`
4. Paste this in:

```json
{
  "name": "gddesign",
  "compatibility_date": "2026-09-09",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

5. Scroll down, click **Commit changes**.

**One thing to check: the `name`.** It must match the name of the Worker you
already created, or Cloudflare will publish to a second, differently named Worker
instead. To find it, go to your Cloudflare dashboard, click **Compute (Workers)**
in the left sidebar, and look at the list. The name is also the first part of the
free `.workers.dev` address. If it is not `gddesign`, edit the `name` line in
`wrangler.json` to match, exactly, including capitalisation.

What the file does, line by line:

- `name` which Worker to publish to
- `compatibility_date` pins Cloudflare's behaviour to how it worked on that date, so a future Cloudflare change cannot break your site. Leave it alone
- `assets.directory` where the finished site ends up after the build. Astro always writes to `dist`
- `not_found_handling` serves your 404 page for a bad URL, instead of a bare Cloudflare error

## Step 2. Fix the build command

Your build settings currently say `nmp run build`. The letters are transposed, so
the build machine looks for a program called `nmp`, does not find one, and stops.
That is the `nmp: not found` line in the log.

1. In Cloudflare, open your Worker.
2. Go to **Settings**, then find the **Build** section.
3. Change the build command from `nmp run build` to:

```
npm run build
```

4. Leave the deploy command as `npx wrangler deploy`. That is correct.
5. Leave root directory as `/`. Also correct.
6. **Save.**

## Step 3. Run it again

1. Go to the **Builds** tab of your Worker.
2. Click **Retry build** on the failed one, or **Create build** if you prefer a
   fresh run.
3. Watch the five stages. You want green ticks on all of them, ending with
   **Deploying**.

It takes about a minute. Expect these lines in the log, in this order:

- `Executing user build command: npm run build`
- `7 page(s) built in ...`
- `Uploaded ... assets`
- `Deployed gddesign`

Then open the `.workers.dev` address shown on the Worker's overview page. That is
your site, live, on a free Cloudflare URL. Your real domain still points at
UXFolio at this stage, so nothing is at risk and there is no rush.

**Check it properly before moving on:** the home page, one case study, the about
page, and the same three on your phone.

## Step 4. Move DNS to Cloudflare

Cloudflare can only serve a root domain like `georgiedoesdesign.com` if it is
running the DNS for it. Your domain stays registered with Namecheap and you keep
paying Namecheap for it. Only the DNS moves.

1. In Cloudflare, click **Add a domain** and enter `georgiedoesdesign.com`.
   Choose the **Free** plan.
2. Cloudflare scans your existing DNS and shows what it found.
   **Compare that list against your Namecheap screenshot now.** Every MX record
   and every TXT record must be there. Add anything missing by hand before you
   continue. This is the step where email breaks if you rush it.
3. Cloudflare gives you two nameservers, something like `dana.ns.cloudflare.com`
   and `rick.ns.cloudflare.com`. Copy both.
4. In Namecheap: **Domain List > georgiedoesdesign.com > Manage**, find
   **Nameservers**, switch the dropdown from "Namecheap BasicDNS" to **Custom
   DNS**, paste the two Cloudflare nameservers, and save with the green tick.
5. Wait. Usually 15 minutes to a few hours, occasionally up to 24. Cloudflare
   emails you when the domain is active.

Your old site keeps serving from UXFolio the whole time this is happening.

## Step 5. Point the domain at the site

Once Cloudflare says the domain is active:

1. Open your Worker, go to **Settings**, then **Domains & Routes**.
2. Click **Add**, choose **Custom domain**.
3. Enter `georgiedoesdesign.com`. Cloudflare creates the DNS record itself. Do
   not create it by hand.
4. Click **Add** again and repeat for `www.georgiedoesdesign.com`.
5. HTTPS is issued automatically, usually within a few minutes.

Open `https://georgiedoesdesign.com`. Done.

## Step 6. Cancel UXFolio

Only once the new site has been live and correct for a few days. Before you
cancel, make sure you have local copies of anything that exists only there: case
study images, your CV, your portrait photo.

---

## From then on

Edit files on github.com and commit. Cloudflare rebuilds and publishes in about a
minute. **EDITING.md** covers that: how to preview a change on its own URL before
it goes live, and how to roll back.

---

## When a build fails

A failed build never touches the live site. It just does not replace it. So you
can always try again.

Open the failed build, read the **last few lines** of the log, and match it here:

| Log says | What it means | Fix |
| --- | --- | --- |
| `nmp: not found` or similar | Typo in the build command | Step 2 above |
| `Missing entry-point` or `assets` error | `wrangler.json` missing or `name` wrong | Step 1 above |
| `Could not resolve ... .png` | An image path in a case study points at a file that is not in the repo | Check the path matches the file in `public/images/`, including capitals |
| `Expected component X to be defined` | A layout block is spelled wrong in a `.mdx` file | Check the spelling against CONTENT-GUIDE.md. They are case sensitive: `Section`, not `section` |
| `Unexpected character` in a `.mdx` file | Usually a stray `{` or `}` in your copy | Write `\{` instead |
| Bullets came out as one paragraph | Missing blank line after an opening tag | Add a blank line under the tag and above the closing tag |

The log always names the file and the line number. That is enough for anyone to
fix it, including you.

## If something looks wrong on the live site

Worker, **Deployments** tab, find the last good one, and roll back to it. The
site reverts straight away. Then fix the file properly.

---

## If you ever want to start over

Delete the Worker in Cloudflare (**Settings > Delete**) and set it up again from
step 1. Your repo is untouched, so nothing is lost. The site is entirely
reconstructible from the GitHub repo, which is the point of it living there.
