# Sarta App — sarta.app

The Maker-facing marketing site for the Sarta platform.

## Run locally
    npm install
    npm run dev

## Deploy (Vercel)
1. Push this folder to a GitHub repository.
2. Go to vercel.com → Add New Project → import the repo.
   Vercel auto-detects Vite; accept the defaults and press Deploy.
3. In the project: Settings → Domains → add `sarta.app` (and `www.sarta.app`).
4. Vercel shows the DNS records to add at your domain registrar —
   typically an A record for the root and a CNAME for www.
   HTTPS is automatic once DNS propagates.

## Notes
- The email capture on the Early Access section is front-end only.
  Wire it to a form service (e.g. Formspree, Buttondown) or your API before launch.
- Sibling site: sarta.studio (client-facing booking experience).
