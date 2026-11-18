# NIAT Dual-Admission Navigator & Parent Concierge

**Live Application:** [https://niat-navigator.vercel.app](https://niat-navigator.vercel.app/)  

## Overview
A bottom-of-funnel (Track B) admission management system built for **NxtWave Institute of Advanced Technologies (NIAT)** to eliminate post-counselling drop-offs. Because students must complete two separate workflows—**NIAT Upskilling Enrolment** and **Collaborating University B.Tech Admission**—this system tracks both tracks in parallel and automates multilingual parent reminders.

## Key Capabilities
* **Parallel Dual-Track Progress Engine:** Tracks NIAT enrolment steps alongside university-specific counselling and document checklists across **230+ A–Z Indian institutions** (`NIAT Partner`, `Public / Govt`, `IIT`, `NIT`, `IIIT`, `GFTI`, `Private`) with phonetic search and a custom college fallback.
* **Tool-Calling Multilingual AI Agent (Groq):** Executes live database and rule-verification tools (`get_student_admission_state`, `validate_eligibility_and_rules`, `dispatch_parent_reminder`) and responds in Telugu, Hindi, Tamil, Kannada, or English.
* **Automated Parent Nudges (n8n + Gmail):** Dispatches localized deadline reminders via n8n webhooks and logs delivery telemetry in Supabase.
* **Growth Manager Ops Dashboard:** Real-time cohort funnel tracking, dual-track completion rates, and reminder audit logs.

## Tech Stack
* **Frontend & API:** Next.js (App Router, TypeScript), Tailwind CSS
* **Database:** Supabase (PostgreSQL)
* **AI Agent:** Groq LLM API with OpenAI-compatible Function Calling
* **Workflow Automation:** n8n Cloud Webhook + Gmail Integration
* **Hosting:** Vercel

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
