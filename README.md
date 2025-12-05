# 🔗 TinyLink
A modern URL shortener built with **Next.js 14**, **TypeScript**, and **PostgreSQL**.

Next.js • TypeScript • Vercel  

🌍 **Live Demo** • 🐞 **Report Bug**

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
