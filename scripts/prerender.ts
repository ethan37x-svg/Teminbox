import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllStaticPages, injectSeoIntoHtml } from '../src/seo/staticRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

async function prerender() {
  console.log('🚀 Starting static pre-rendering of public editorial & trust pages...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ Error: dist/index.html does not exist. Run "vite build" first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  const allPages = getAllStaticPages();

  let count = 0;
  for (const [route, pageData] of Object.entries(allPages)) {
    const renderedHtml = injectSeoIntoHtml(baseHtml, route);

    if (route === '/') {
      fs.writeFileSync(indexPath, renderedHtml, 'utf-8');
      console.log(` ✅ Prerendered root: / -> dist/index.html`);
      count++;
    } else if (route === '/404') {
      const p404 = path.join(distDir, '404.html');
      fs.writeFileSync(p404, renderedHtml, 'utf-8');
      console.log(` ✅ Prerendered 404: /404 -> dist/404.html`);
      count++;
    } else {
      // route is e.g. /about, /guides, /guides/what-is-a-temporary-email-address
      const relativeFolder = route.replace(/^\/+/, '');
      const targetFolder = path.join(distDir, relativeFolder);
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
      }
      const targetFilePath = path.join(targetFolder, 'index.html');
      fs.writeFileSync(targetFilePath, renderedHtml, 'utf-8');
      console.log(` ✅ Prerendered: ${route} -> dist/${relativeFolder}/index.html`);
      count++;
    }
  }

  console.log(`✨ Successfully prerendered ${count} public routes with complete SEO tags and semantic HTML!`);
}

prerender().catch((err) => {
  console.error('❌ Prerender script error:', err);
  process.exit(1);
});
