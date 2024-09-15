# ShortFlare

Shorten and track URLs on your domain for completely free with your Cloudflare account

- Unlimited URLs
- Ultra low-latency redirects hanks to Cloudflare's 275+ locations
- Free unlimited geo-located analytics (up to Workers Free limit off 100k per day)
- Manage your links with an API, or a dashboard
- No need to [sign up for three billion different SaaS products](https://github.com/dubinc/dub?tab=readme-ov-file#tech-stack), all you need is that Cloudflare account you already have
- Easy (ish) setup

## Setup
You'll need:

- A Cloudflare Account
- A VPS or similar Linux server

[Read the setup guide](https://docs.mikn.dev/solutions/shortflare)

> If you don't require analytics or a dashboard, you may just [deploy the worker](https://docs.mikn.dev/solutions/shortflare#) and have fun!<br>
> ⚠️ ShortFlare's UI will not run on a serverless PaaS (e.g. Vercel, Netlify), you will need a proper server to run it

## Powered by
- [Cloudflare Workers](https://workers.cloudflare.com)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Next.JS](https://nextjs.org/)
    - [shadcn/ui](https://ui.shadcn.com/)
    - [UIAstra](https://www.uiastra.com/)
    - [Sonner](https://sonner.emilkowal.ski/)
    - [NextAuth.JS](https://next-auth.js.org/)
