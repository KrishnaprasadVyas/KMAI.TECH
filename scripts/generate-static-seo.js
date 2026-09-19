import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');
const projectsFile = path.resolve(__dirname, '../src/data/projects.ts');
const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
const publicSitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

const siteUrl = 'https://kmai.tech';
const today = new Date().toISOString().split('T')[0];

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractProjectBlocks(content) {
  const blocks = [];
  const regex = /{\s*id:\s*\d+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const startIndex = match.index;
    let depth = 0;
    let inString = false;
    let stringChar = '';
    for (let i = startIndex; i < content.length; i++) {
      const char = content[i];
      const prevChar = i > 0 ? content[i - 1] : '';
      if (inString) {
        if (char === stringChar && prevChar !== '\\') {
          inString = false;
        }
      } else {
        if (char === "'" || char === '"' || char === '`') {
          inString = true;
          stringChar = char;
        } else if (char === '{') {
          depth++;
        } else if (char === '}') {
          depth--;
          if (depth === 0) {
            blocks.push(content.slice(startIndex, i + 1));
            break;
          }
        }
      }
    }
  }
  return blocks;
}

// 1. Read and parse projects data
const projectsContent = fs.readFileSync(projectsFile, 'utf-8');
const projects = [];
const objectBlocks = extractProjectBlocks(projectsContent);

for (const block of objectBlocks) {
  const slugMatch = block.match(/slug:\s*'([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const descMatch = block.match(/description:\s*(['"`])([\s\S]*?)\1/);
  const ogImageMatch = block.match(/ogImage:\s*'([^']+)'/);
  const imageMatch = block.match(/\bimage:\s*'([^']+)'/);
  
  if (slugMatch && titleMatch) {
    projects.push({
      slug: slugMatch[1],
      title: titleMatch[1],
      description: descMatch ? descMatch[2].replace(/\n/g, ' ').trim() : '',
      ogImage: ogImageMatch ? ogImageMatch[1] : (imageMatch ? imageMatch[1] : '/og-image.png'),
    });
  }
}

// Ensure index.html exists (script should run after build)
if (!fs.existsSync(indexHtmlPath)) {
  console.error('[SEO] dist/index.html not found. Run this script after vite build.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

function createPageHtml(baseHtml, { title, description, url, image, type = 'website', schema }) {
  let html = baseHtml;

  // Replace Title & Primary Meta Tags
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="title" content=".*?"\s*\/?>/i, `<meta name="title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);

  // Replace or Add Canonical Link
  if (/<link rel="canonical" href=".*?"\s*\/?>/i.test(html)) {
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${url}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${url}" />\n  </head>`);
  }

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:type" content=".*?"\s*\/?>/i, `<meta property="og:type" content="${type}" />`);
  html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${image}" />`);

  // Replace Twitter Tags
  html = html.replace(/<meta property="twitter:url" content=".*?"\s*\/?>/i, `<meta property="twitter:url" content="${url}" />`);
  html = html.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/i, `<meta property="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/i, `<meta property="twitter:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/i, `<meta property="twitter:image" content="${image}" />`);

  // Append page-specific structured data before </head> if provided
  if (schema) {
    const schemaScript = `\n    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>\n  `;
    html = html.replace('</head>', `${schemaScript}</head>`);
  }

  return html;
}

// 2. Generate Prerendered HTML for Case Studies
for (const project of projects) {
  const projectDir = path.resolve(distDir, 'work', project.slug);
  fs.mkdirSync(projectDir, { recursive: true });

  const title = `${project.title} — KMAI.tech`;
  const description = project.description;
  const url = `${siteUrl}/work/${project.slug}`;
  const image = project.ogImage.startsWith('http') ? project.ogImage : `${siteUrl}${project.ogImage}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} — KMAI.tech Case Study`,
    image: image,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'KMAI.tech',
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'KMAI.tech',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`
      }
    },
    description: description
  };

  const finalHtml = createPageHtml(templateHtml, {
    title,
    description,
    url,
    image,
    type: 'article',
    schema: articleSchema
  });

  fs.writeFileSync(path.resolve(projectDir, 'index.html'), finalHtml);
  console.log(`[SEO] Generated static file for /work/${project.slug}`);
}

// 3. Generate Prerendered HTML for Start a Project
const startProjectDir = path.resolve(distDir, 'start-a-project');
fs.mkdirSync(startProjectDir, { recursive: true });

const startProjectTitle = 'Start a Project — KMAI.tech';
const startProjectDesc = 'Enquire about starting a digital project with KMAI.tech. Bespoke websites, software systems, and business automation.';
const startProjectUrl = `${siteUrl}/start-a-project`;
const startProjectImage = `${siteUrl}/og-image.png`;

const startProjectHtml = createPageHtml(templateHtml, {
  title: startProjectTitle,
  description: startProjectDesc,
  url: startProjectUrl,
  image: startProjectImage,
  type: 'website'
});

fs.writeFileSync(path.resolve(startProjectDir, 'index.html'), startProjectHtml);
console.log(`[SEO] Generated static file for /start-a-project`);

// 4. Generate Sitemap
const urls = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/start-a-project', priority: '0.8', changefreq: 'monthly' },
  ...projects.map(p => ({ url: `/work/${p.slug}`, priority: '0.9', changefreq: 'monthly' }))
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(distSitemapPath, sitemapXml);
fs.writeFileSync(publicSitemapPath, sitemapXml);
console.log('[SEO] Generated sitemap.xml in dist/ and public/');
