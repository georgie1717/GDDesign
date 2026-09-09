# Writing a case study

Each case study is one file in `src/content/work/`. The filename becomes the URL:

```
src/content/work/partner-cart.mdx   ->   georgiedoesdesign.com/p/partner-cart
```

A file has two parts: **front matter** (the settings block at the top, between
the `---` lines) and **the body** (everything below it).

`checkout-conversion.mdx` is a complete worked example. Copy it when you want a
starting point.

---

## Front matter

```yaml
---
title: 'Juice Plus+, Checkout that converts without forcing accounts'
category: 'Product Design'
summary: 'One sentence. Used on the card, in Google results and when the link is shared.'
intro:
  - 'First paragraph under the title.'
  - 'Second paragraph. Add as many as you like.'
meta:
  - label: 'Role'
    value: 'Sole UX/UI Designer'
  - label: 'Platform'
    value: 'Shopify Plus'
thumbnail: '/images/work/checkout-conversion/thumb.png'
hero: '/images/work/checkout-conversion/hero.png'
order: 1
year: '2025'
draft: false
---
```

| Field       | Required | What it does                                                        |
| ----------- | -------- | ------------------------------------------------------------------- |
| `title`     | yes      | The page heading and the card title                                 |
| `category`  | yes      | The orange pill on the card, e.g. "Product Design"                  |
| `summary`   | yes      | SEO description and social share text                               |
| `intro`     | no       | Paragraphs under the title. A list, one line each                   |
| `meta`      | no       | The Role / Platform / Scope rows                                    |
| `thumbnail` | yes      | Card image on the home page                                         |
| `hero`      | no       | Large image beside the title                                        |
| `order`     | no       | Lower number shows first on the home page. Default 99               |
| `year`      | no       | Small year label on the card                                        |
| `draft`     | no       | `true` hides it from the site completely. Safe place to write        |

**Watch out for apostrophes.** If your title contains one, wrap the value in
double quotes instead of single: `title: "Checkout that doesn't force accounts"`.

---

## The body

Ordinary markdown works: paragraphs, `**bold**`, `*italic*`, `- bullet lists`,
`[links](https://example.com)`, `### subheadings`.

On top of that you have these layout blocks. You do not need to import anything,
just use them.

### Section

Every part of a case study sits inside a `Section`. It draws the band of
background colour and places the heading.

```mdx
<Section title="The Problem" tone="surface">

The existing experience was fragmented across checkout, login and account
systems.

</Section>
```

| Prop      | Options                                | Default   |
| --------- | -------------------------------------- | --------- |
| `title`   | any text, or leave it off              | none      |
| `eyebrow` | small label above the heading           | none      |
| `tone`    | `plain` `surface` `white` `cream`      | `plain`   |
| `layout`  | `split` or `stack`                     | `split`   |
| `tight`   | `tight` for less vertical padding       | off       |
| `id`      | anchor, so you can link to the section  | none      |

- `layout="split"` puts the heading in a left column and the content in a right
  column, like the current site. The heading sticks as you scroll.
- `layout="stack"` puts the heading above full-width content. Use this for card
  grids, wide diagrams and image-led sections.
- Alternate `tone="surface"` and `tone="plain"` down the page so the sections
  read as separate bands.

### Figure

```mdx
<Figure
  src="/images/work/checkout-conversion/otp-flow.png"
  alt="One-time passcode entry screens for guest checkout"
  caption="OTP entry as part of the guest checkout journey"
  framed
/>
```

`alt` describes the image for screen readers and is not shown. `caption` is the
small grey line underneath and is shown. Add `framed` to sit the image on a soft
card background, which suits flat UI screens. Leave it off for photos and
diagrams that already have their own background.

Adding `width={1600} height={900}` stops the page jumping as the image loads.
Worth doing for the images near the top of a page.

### Cards

Good for numbered problems, principles, or anything that reads as a set.

```mdx
<CardGrid cols={2}>

<Card title="1. Checkout friction">
- Users were forced into account creation
- No guest checkout for purchase journeys
</Card>

<Card title="2. Password-only authentication">
- The system relied entirely on password-based login
</Card>

</CardGrid>
```

`cols` can be `2` or `3`. Cards stack on mobile.

### Stats

The numbers row. This is the part hiring managers read, so put your strongest
four here.

```mdx
<Stats cols={4}>
  <Stat value="15-22%" label="Reduction in checkout drop-off during testing" />
  <Stat value="30%+" label="Reduction in failed login attempts" />
</Stats>
```

`cols` can be `2`, `3` or `4`.

### Callout

A single large statement. Use it sparingly, once or twice per case study, for
your reframe or your closing line.

```mdx
<Callout>
How might we align identity, purchase and partner attribution into a single,
coherent journey?
</Callout>
```

`<Callout tone="note">` gives you a quiet grey aside instead.

### Lead

Makes the following paragraph larger, for the opening line of a section.

```mdx
<Lead>
The redesigned system established a more flexible and scalable foundation.
</Lead>
```

### Cols

Two or three columns of ordinary text and subheadings, side by side.

```mdx
<Cols cols={2}>

<div>

### Conversion performance

Text and bullets.

</div>

<div>

### Attribution accuracy

Text and bullets.

</div>

</Cols>
```

---

## Two rules that will save you time

1. **Leave a blank line** after an opening tag and before a closing tag. Without
   it, markdown inside the block is not processed and your bullets come out as
   plain text.

2. **Curly braces `{` and `}`** are code in `.mdx` files. If you need one in
   your copy, write `\{` instead.

If the build fails, the error tells you the file and line number. It is almost
always one of those two.

---

## A structure that works

The case studies that read best follow roughly this shape:

1. **The Problem** - what was broken and why it mattered commercially
2. **Key issues** - the specific failures, as a card grid
3. **Constraints** - what you could not change
4. **Research or journey mapping** - how you worked out what was really going on
5. **The reframe** - a `Callout` with the question you decided to answer
6. **What you designed** - `layout="stack"`, one subheading per decision, each
   with a `Figure`
7. **Outcome** - a `Stats` row, then the detail in `Cols`
8. **Reflection** - what you learned and what you would do next

Not every project needs all eight. Two strong sections beat eight thin ones.
