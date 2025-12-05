# 🔗 TinyLink

A modern URL shortener built with Next.js 14, TypeScript, and PostgreSQL.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

[Live Demo](https://your-tinylink.vercel.app) • [Report Bug](../../issues)

---

## ✨ Features

- 🔗 Shorten URLs with custom or auto-generated codes
- 📊 Track clicks and view analytics
- ⚡ Fast & responsive UI with Tailwind CSS
- 🚀 One-click deploy to Vercel

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/tinylink.git
cd tinylink
npm install

# Set up environment
cp .env.example .env.local
# Add your POSTGRES_URL to .env.local

# Initialize database
psql $POSTGRES_URL -f schema.sql

# Run development server
npm run dev
```

Open [ https://tinylink-t6spvpkt5-hafsa-ahamadis-projects.vercel.app/] (http://localhost:3000) 


---

## 🔐 Environment Variables

```env
POSTGRES_URL="postgres://username:password@host:port/database"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Database Options:**
- [Vercel Postgres](https://vercel.com/storage/postgres) (Recommended)
- [Neon](https://neon.tech/) (Free tier)
- Local PostgreSQL

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Health check |
| `POST` | `/api/links` | Create short link |
| `GET` | `/api/links` | List all links |
| `GET` | `/api/links/:code` | Get link stats |
| `DELETE` | `/api/links/:code` | Delete link |
| `GET` | `/:code` | Redirect to target URL |

**Example:**
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com", "customCode": "gh"}'
```

---

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tinylink)

1. Click "Deploy" button above
2. Add `POSTGRES_URL` in environment variables
3. Create a Postgres database in Vercel Storage
4. Run `schema.sql` in your database
5. Done! 🎉

---

## 📁 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with @vercel/postgres
- **Deployment:** Vercel

---

## 🤝 Contributing

Contributions welcome! Fork the repo and submit a pull request.

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.


