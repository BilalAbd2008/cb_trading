# CB Trading Landing Page

Modern, responsive landing page untuk CB Trading - platform trading cryptocurrency dan forex.

![CB Trading](https://img.shields.io/badge/Next.js-14.0-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Fitur

- ✨ **Modern Design** - Gradient backgrounds, glassmorphism effects
- 📱 **Fully Responsive** - Mobile, tablet, dan desktop
- ⚡ **Fast Performance** - Built dengan Next.js 14
- 🎨 **Beautiful UI** - Tailwind CSS dengan custom theme
- 🌊 **Smooth Animations** - Interactive hover effects dan transitions
- 📊 **Live Ticker** - Real-time crypto price ticker
- 💳 **Pricing Plans** - Multiple subscription tiers
- ❓ **FAQ Accordion** - Collapsible questions & answers
- 🎯 **SEO Optimized** - Metadata dan semantic HTML

## 📋 Sections

1. **Hero** - Eye-catching landing section dengan animated background
2. **Ticker** - Scrolling cryptocurrency prices
3. **About** - Informasi tentang CB Trading
4. **Market Coverage** - Crypto & Forex signals
5. **Why Choose Us** - 4 key features
6. **Member Benefits** - 6 membership advantages
7. **Pricing** - 2 subscription plans ($99 & $189)
8. **Stats** - Key statistics
9. **Testimonials** - Customer reviews
10. **Team** - Expert traders
11. **FAQ** - Common questions
12. **Footer** - Links dan informasi

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS 3.3
- **Language**: TypeScript 5
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. Install dependencies:

```powershell
npm install
```

2. Run development server:

```powershell
npm run dev
```

3. Open browser:

```
http://localhost:3000
```

## 🏗️ Build

Build untuk production:

```powershell
npm run build
npm start
```

## 📁 Project Structure

```
cb_trading/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── Ticker.tsx       # Price ticker
│   ├── About.tsx        # About section
│   ├── MarketCoverage.tsx
│   ├── WhyChooseUs.tsx
│   ├── MemberBenefits.tsx
│   ├── Pricing.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   ├── Team.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
└── package.json
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` untuk mengubah color scheme:

```typescript
colors: {
  primary: { ... },
  accent: { ... }
}
```

### Content

Edit file di folder `components/` untuk mengubah konten.

## 🚀 Deployment

Deploy ke Vercel (recommended):

```powershell
npm install -g vercel
vercel
```

Atau platform lain:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📝 License

MIT License - bebas digunakan untuk project komersial maupun personal.

## 👨‍💻 Developer

Created with ❤️ using GitHub Copilot

---

**Note**: Ini adalah landing page template. Ganti konten, gambar, dan link sesuai kebutuhan bisnis Anda.
