# Getting the site live on georgiedoesdesign.com

One-time setup, about 30 minutes plus waiting for DNS. After this, every push to
`main` publishes automatically in around a minute.

**Host: Cloudflare Pages.** Free, no bandwidth charges for static files, and 500
builds a month, which is far more headroom than you will use. The one catch is
that Cloudflare needs to run your DNS to serve a root domain like
`georgiedoesdesign.com`, so step 3 moves your nameservers from Namecheap to
Cloudflare. Your domain stays registered with Namecheap and you keep paying
Namecheap for it. Only the DNS moves.

If you would rather not move nameservers, see **Alternative** at the bottom.

---

## Before you start: protect your email

`hello@georgiedoesdesign.com` only works because of DNS records at Namecheap
(MX, and probably SPF/DKIM TXT records). Moving nameservers moves those records
too, and if any are missed your email stops arriving.

Cloudflare scans and imports your existing records automatically, but check it
rather than trust it:

1. In Namecheap, go to **Domain List > georgiedoesdesign.com > Advanced DNS**.
2. Screenshot the whole record list, or copy it into a text file.
3. Keep that until the new site has been live for a week.

You will compare it against Cloudflare's imported list in step 3.

---

## 1. Put the code on GitHub

If you do not have a GitHub account, create one at github.com first.

This is the only step that touches your own machine. After it, everything happens
in the browser.

### No terminal: GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com) and sign in.
2. **File > Add local repository**, choose this unzipped folder. It will say the
   folder is not a repository yet and offer to **create one**. Do that.
3. It lists the files it is about to include. `node_modules` and `dist` are
   already excluded by `.gitignore`, so you should see around 80 files. Write
   "New portfolio site" in the summary box and click **Commit to main**.
4. Click **Publish repository**. Name it `georgiedoesdesign` and tick
   **Keep this code private**.

Done. GitHub Desktop stays useful later if you ever want to work on files
locally, but you do not have to open it again.

### Or, if you are comfortable in a terminal

```bash
gh auth login
git init
git add .
git commit -m "New portfolio site"
gh repo create georgiedoesdesign --private --source=. --push
```

## 2. Connect Cloudflare Pages

1. Sign up or log in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages > Create > Pages > Connect to Git**.
3. Authorise GitHub and pick the `georgiedoesdesign` repo.
4. Set the build configuration:

   | Setting              | Value           |
   | -------------------- | --------------- |
   | Framework preset     | Astro           |
   | Build command         | `npm run build` |
   | Build output directory | `dist`        |

5. Under **Environment variables**, add `NODE_VERSION` = `22`.
6. **Save and Deploy.**

A minute later you get a live URL like `georgiedoesdesign.pages.dev`. Open it and
check the site works. Nothing has changed on your real domain yet, so there is no
rush and no risk at this point.

## 3. Move DNS to Cloudflare

1. In Cloudflare, **Add a site** (top of the dashboard) and enter
   `georgiedoesdesign.com`. Choose the **Free** plan.
2. Cloudflare scans your existing DNS and shows what it found.
   **Compare this list against your Namecheap screenshot now.** Every MX record
   and every TXT record must be present. Add anything missing by hand before
   continuing.
3. Cloudflare gives you two nameservers, something like
   `dana.ns.cloudflare.com` and `rick.ns.cloudflare.com`. Copy them.
4. In Namecheap: **Domain List > georgiedoesdesign.com > Manage**, find
   **Nameservers**, switch from "Namecheap BasicDNS" to **Custom DNS**, and paste
   the two Cloudflare nameservers. Save with the green tick.
5. Wait. Usually 15 minutes to a few hours, occasionally up to 24. Cloudflare
   emails you when the domain is active.

While you wait, your site keeps serving from UXFolio, so nothing breaks.

## 4. Point the domain at the site

Once Cloudflare says the domain is active:

1. **Workers & Pages >** your Pages project **> Custom domains > Set up a
   domain**.
2. Enter `georgiedoesdesign.com` and continue. Cloudflare creates the DNS record
   for you. Do not create it by hand, that produces a 522 error.
3. Repeat for `www.georgiedoesdesign.com`.
4. HTTPS is issued automatically, usually within a few minutes.

Open `https://georgiedoesdesign.com`. That is the new site live.

## 5. Cancel UXFolio

Only after the new site has been live and correct for a few days. Before you do,
check you have local copies of anything only stored there: case study images,
your CV, your portrait photo.

---

## From then on

Edit files on github.com and commit. Cloudflare rebuilds and publishes in about a
minute. **EDITING.md** is the guide for that, including how to preview a change
on its own URL before it goes live, and how to roll back.

If you do end up working locally, it is the usual three commands:

```bash
git add .
git commit -m "Add partner cart case study"
git push
```

---

## Keeping the old URLs working

Your current case study URLs look like `/p/checkout-conversion`. The new site
uses the same pattern, so as long as you keep the filename matching the old
slug, any link you have shared before still works.

If you rename a case study file later and want the old link to keep working, add
a redirect to `public/_redirects`:

```
/p/old-slug  /p/new-slug  301
```

---

## Alternative: keep DNS at Namecheap

If you do not want to move nameservers, use **Netlify** instead. Connect the
GitHub repo the same way (build command `npm run build`, publish directory
`dist`), then at Namecheap under **Advanced DNS** add:

| Type  | Host | Value                                 |
| ----- | ---- | ------------------------------------- |
| ALIAS | @    | `apex-loadbalancer.netlify.com`       |
| CNAME | www  | `<your-site-name>.netlify.app`        |

Add the domain in Netlify's **Domain management** first, then create the records.
HTTPS is issued automatically. Your email records stay exactly where they are,
untouched.

Worth knowing: Netlify's current free plan works on monthly credits and charges
credits per production deploy, so if you push a lot of small edits you can run
out towards the end of a month. Cloudflare's 500 builds a month is the roomier
option, which is why it is the recommendation above.
