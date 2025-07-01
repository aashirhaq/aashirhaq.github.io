# Aashir Portfolio

A modern, responsive portfolio website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This project is designed for developers who want to showcase their work, experience, and skills with a beautiful, customizable site. It is statically exported and deployed to GitHub Pages.

## Features
- ⚡ Fast, static export with Next.js
- 🎨 Styled with Tailwind CSS (customizable themes)
- 🧩 Modular, reusable React components
- 🌙 Dark mode support
- 📱 Fully responsive design
- 📝 TypeScript for type safety
- 🛠️ Custom hooks and utility functions
- 🧑‍💻 Easy to extend with your own sections
- 🚀 CI/CD deployment to GitHub Pages

## Directory Structure
```
├── app/                # Main app directory (Next.js 13+)
│   ├── page.tsx        # Homepage
│   ├── layout.tsx      # Root layout and providers
│   ├── globals.css     # Global styles (Tailwind)
├── components/         # Reusable React components
│   └── ui/             # UI primitives (buttons, cards, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets (images, favicon, etc.)
├── styles/             # Additional global styles
├── .github/workflows/  # GitHub Actions for deployment
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
```

## Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/aashirhaq/aashirhaq.github.io.git
cd aashirhaq.github.io
```

### 2. **Install dependencies**
> **Note:** If you encounter dependency conflicts, see `install-commands.md` for troubleshooting.

```bash
npm install --legacy-peer-deps
# or
yarn install
```

### 3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) to view your site.

### 4. **Build for production**
```bash
npm run build
```

### 5. **Export static site**
```bash
npm run export
```
The static files will be output to the `out/` directory.

## Deployment (GitHub Pages)
This project uses GitHub Actions to deploy the static site to GitHub Pages automatically on every push to `main`.

- The workflow is defined in `.github/workflows/deploy.yml`.
- Output directory is `out/` (see `next.config.mjs`).
- No manual action is needed; just push to `main`.

## Customization Guide

1. **Update content:**
   - Edit files in `components/` (e.g., `hero-section.tsx`, `about-section.tsx`, etc.)
   - Update static assets in `public/`
2. **Add new sections:**
   - Create new components in `components/` and import them in `app/page.tsx`.
3. **Change theme/colors:**
   - Edit `tailwind.config.ts` and CSS variables in `app/globals.css`.
4. **Update metadata:**
   - Edit `app/layout.tsx` for SEO, Open Graph, and Twitter meta tags.
5. **Add custom hooks or utilities:**
   - Place them in `hooks/` or `lib/`.

## Step-by-Step: Create Your Own Portfolio

1. **Create a new Next.js app with TypeScript:**
   ```bash
   npx create-next-app@latest my-portfolio -ts
   cd my-portfolio
   ```
2. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. **Configure Tailwind:**
   - Update `tailwind.config.js` and add Tailwind imports to your CSS.
4. **Set up your directory structure:**
   - Create `components/`, `hooks/`, `lib/`, `public/`, etc.
5. **Add your pages and components:**
   - Use modular components for sections (About, Projects, Contact, etc.)
6. **Customize styles and content:**
   - Edit Tailwind config, CSS variables, and component props.
7. **Set up static export:**
   - In `next.config.js`, set `output: 'export'` and `distDir: 'out'`.
   - Use `npm run build` and `npm run export`.
8. **Deploy to GitHub Pages:**
   - Push to GitHub and set up a GitHub Actions workflow (see `.github/workflows/deploy.yml`).

## License

This project is open source and available under the [MIT License](LICENSE). 