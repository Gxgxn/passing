# Passing

> A website you can only visit once.

*"This page is borrowing time from you. When you leave, the debt is settled. It won't open again."*

## Overview

Passing is a Next.js application that allows users to view exclusive content exactly once. Using a dual-layer identification system (HTTP-only cookies + IP address storage in Redis), returning visitors are automatically redirected to an "expired" page.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Upstash Redis

## Getting Started

### 1. Clone and Install

```bash
cd passing
npm install
```

### 2. Configure Upstash Redis

1. Create a free Redis database at [console.upstash.com](https://console.upstash.com)
2. Create a `.env.local` file in the project root:

```env
UPSTASH_REDIS_REST_URL=your-redis-rest-url-here
UPSTASH_REST_TOKEN=your-redis-rest-token-here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with entry link |
| `/exclusive` | One-time content page (triggers cookie + IP storage) |
| `/expired` | Access denied page for return visitors |

## How It Works

1. **Middleware Interception**: Requests to `/exclusive` are intercepted by `middleware.ts`
2. **Dual-Layer Check**: 
   - Cookie check: `time_borrowed=settled`
   - Redis check: IP address lookup
3. **Access Control**: If either check indicates a previous visit, redirect to `/expired`
4. **First Visit**: On first access, both cookie and IP are stored

## Deployment

Deploy to Vercel for automatic IP detection via `x-forwarded-for` headers:

```bash
npx vercel
```

## License

MIT
