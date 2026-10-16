# Getting the site live on georgiedoesdesign.com

Hosted on **Netlify**. The site is already building there; this covers pointing
your domain at it and what to do day to day.

Nothing here needs a terminal.

---

## The good news about your domain

Netlify can serve `georgiedoesdesign.com` while Namecheap keeps running your
DNS. You add two records and that is it.

That matters because `hello@georgiedoesdesign.com` only works thanks to MX and
TXT records sitting at Namecheap. You are not moving them, so there is nothing
to break. (The Cloudflare route would have required moving your nameservers,
which is where email usually goes wrong.)

---

## Step 1. Check the site builds and looks right

In Netlify, open your site and look at **Deploys**. The most recent one should
say **Published**.

Click the `*.netlify.app` address at the top of the site overview. Check the
home page, one case study, and the about page, on your laptop and your phone,
before you touch any DNS.

## Step 2. Tell Netlify about your domain

1. In your Netlify site, go to **Domain management** (under **Project
   configuration**), then **Add a domain**.
2. Enter `georgiedoesdesign.com` and continue.
3. When Netlify asks, choose the option to **keep using your existing DNS**
   rather than switching to Netlify DNS. It will then show you the records to
   create.

Do this step first. If you create the records at Namecheap before Netlify knows
about the domain, it will not serve the site and you will get an error page.

## Step 3. Add two records at Namecheap

**Domain List > georgiedoesdesign.com > Advanced DNS**.

Before you change anything, screenshot the existing record list. You are not
touching the MX or TXT records, but having a copy costs nothing.

Then add:

| Type  | Host | Value                              |
| ----- | ---- | ---------------------------------- |
| ALIAS | @    | `apex-loadbalancer.netlify.com`    |
| CNAME | www  | `<your-site-name>.netlify.app`     |

Replace `<your-site-name>` with whatever Netlify gave you, for example
`gddesign.netlify.app`. Leave off the `https://`.

If there is an existing A record or CNAME on `@` or `www` pointing at UXFolio,
delete those two. Leave everything else exactly as it is.

Netlify prefers ALIAS over a plain A record because it follows their load
balancer if the IP ever changes. Namecheap supports ALIAS, so use it.

## Step 4. Wait, then check HTTPS

DNS usually updates within 30 minutes, occasionally a few hours.

Back in Netlify's **Domain management**, the domain should go from a warning to
a green tick. HTTPS is issued automatically with Let's Encrypt, normally within
a few minutes of the DNS resolving. If it has not appeared after an hour, there
is a **Verify DNS configuration** button there to prod it.

Open `https://georgiedoesdesign.com`. Done.

## Step 5. Cancel UXFolio

Once the new site has been live and correct for a few days. Before you cancel,
make sure you have your own copies of anything that exists only there: case
study images, your CV, your portrait photo.

---

## From then on

Edit files on github.com and commit. Netlify rebuilds and publishes in about a
minute. **EDITING.md** covers that: how to preview a change on its own URL
before it goes live, and how to roll back.

Netlify's equivalents of what EDITING.md describes:

- **Branch previews.** Commit to a branch instead of `main` and Netlify builds
  it to its own URL. Find it under **Deploys**, or as a comment on the pull
  request.
- **Rollback.** **Deploys**, click an older successful deploy, then **Publish
  deploy**. The site reverts immediately.

## One thing to keep an eye on

Netlify's current free plan runs on credits rather than fixed limits: 300 a
month, with a production deploy costing 15 and bandwidth costing 20 per GB.

In practice that is roughly twenty publishes a month before bandwidth is even
counted. Fine for normal use, but if you are tweaking a case study and pushing
twenty small commits in an afternoon, you can run the month down. Two habits
avoid it entirely: work on a branch and merge once when you are happy, and batch
several edits into one commit rather than committing each paragraph.

You can see where you are under **Billing** in your Netlify team settings.

---

## When a build fails

A failed build never replaces the live site, so you can always retry.

Open the failed deploy and read the **last few lines** of the log.

| Log says | What it means | Fix |
| --- | --- | --- |
| `npm error ERESOLVE` | `package.json` and the lockfile disagree | Both files need regenerating together |
| `Could not resolve ... .png` | An image path in a case study points at a file that is not in the repo | Check the path matches the file in `public/images/`, including capitals |
| `Expected component X to be defined` | A layout block is spelled wrong in a `.mdx` file | Check it against CONTENT-GUIDE.md. They are case sensitive: `Section`, not `section` |
| `Unexpected character` in a `.mdx` file | Usually a stray `{` or `}` in your copy | Write `\{` instead |
| Bullets came out as one paragraph | Missing blank line after an opening tag | Add a blank line under the tag and above the closing tag |

The log always names the file and the line number.

---

## If you ever want to start over

Delete the site in Netlify and connect the repo again. Your repo is untouched,
so nothing is lost. The whole site is reconstructible from GitHub, which is the
point of it living there.
