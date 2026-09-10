/**
 * Site-wide details. Edit these and everything updates: nav, footer,
 * page titles, social sharing, CV link.
 */
export const site = {
  name: 'Georgie Hewitt',
  shortName: 'Georgie',
  role: 'Senior UX/UI Designer',
  domain: 'georgiedoesdesign.com',
  url: 'https://georgiedoesdesign.com',
  email: 'hello@georgiedoesdesign.com',
  location: 'London',

  // Used as the browser tab title on the home page and for social sharing
  tagline: 'Senior UX/UI Designer',
  description:
    'Product Designer based in London, designing intuitive, high-performing digital experiences across checkout, authentication and conversion flows.',

  // Put your CV PDF in public/ and reference it here
  cv: '/georgie-hewitt-cv.pdf',

  linkedin: 'https://www.linkedin.com/in/georgie-hewitt/',

  // Social share image: 1200x630px, saved in public/
  ogImage: '/images/og-default.png',

  nav: [
    { label: 'My work', href: '/#work' },
    { label: 'About me', href: '/about' },
    { label: 'CV', href: '/georgie-hewitt-cv.pdf', external: true },
    { label: 'Contact', href: '/#contact' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/georgie-hewitt/', external: true },
  ],
} as const;
