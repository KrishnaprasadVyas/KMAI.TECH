import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');
const projectsFile = path.resolve(__dirname, '../src/data/projects.ts');
const sitemapPath = path.resolve(distDir, 'sitemap.xml');

const siteUrl = 'https://kmai.tech';

// 1. Read and parse projects data
const projectsContent = fs.readFileSync(projectsFile, 'utf-8');
const projects = [];
const objectBlocks = projectsContent.match(/{\s*id:[\s\S]*?},/g) || [];

for (const block of objectBlocks) {
  const slugMatch = block.match(/slug:\s*'([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const descMatch = block.match(/description:\s*(['"`])([\s\S]*?)\1/);
  const ogImageMatch = block.match(/ogImage:\s*'([^']+)'/);
  const imageMatch = block.match(/image:\s*'([^']+)'/);
  
  if (slugMatch && titleMatch) {
    projects.push({
      slug: slugMatch[1],
      title: titleMatch[1],
      description: descMatch ? descMatch[2].replace(/\n/g, ' ').trim() : '',
      ogImage: ogImageMatch ? ogImageMatch[1] : (imageMatch ? imageMatch[1] : '/og-default.jpg'),
    });
  }
}

// Ensure index.html exists (script should run after build)
if (!fs.existsSync(indexHtmlPath)) {
  console.error('[SEO] dist/index.html not found. Run this script after vite build.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// 2. Generate Prerendered HTML for Case Studies
for (const project of projects) {
  const projectDir = path.resolve(distDir, 'work', project.slug);
  fs.mkdirSync(projectDir, { recursive: true });

  const title = `${project.title} — KMAI.tech`;
  const description = project.description;
  const url = `${siteUrl}/work/${project.slug}`;
  const image = `${siteUrl}${project.ogImage}`;

  // Replace standard tags (naive replacement before </head>)
  let finalHtml = templateHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${title}</title>`
  );

  const metaTags = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  `;

  finalHtml = finalHtml.replace('</head>', `${metaTags}\n  </head>`);

  fs.writeFileSync(path.resolve(projectDir, 'index.html'), finalHtml);
  console.log(`[SEO] Generated static file for /work/${project.slug}`);
}

// 3. Generate Prerendered HTML for Start a Project
const startProjectDir = path.resolve(distDir, 'start-a-project');
fs.mkdirSync(startProjectDir, { recursive: true });

const startProjectTitle = "Start a Project — KMAI.tech";
const startProjectDesc = "Enquire about starting a digital project with KMAI.tech.";
let startProjectHtml = templateHtml.replace(
  /<title>.*?<\/title>/i,
  `<title>${startProjectTitle}</title>`
);
const startProjectMetaTags = `
  <meta name="description" content="${startProjectDesc}" />
  <meta property="og:title" content="${startProjectTitle}" />
  <meta property="og:description" content="${startProjectDesc}" />
  <meta property="og:url" content="${siteUrl}/start-a-project" />
`;
startProjectHtml = startProjectHtml.replace('</head>', `${startProjectMetaTags}\n  </head>`);
fs.writeFileSync(path.resolve(startProjectDir, 'index.html'), startProjectHtml);
console.log(`[SEO] Generated static file for /start-a-project`);

// 4. Generate Sitemap
const urls = [
  { url: '/', priority: '1.0' },
  { url: '/start-a-project', priority: '0.8' },
  ...projects.map(p => ({ url: `/work/${p.slug}`, priority: '0.9' }))
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${siteUrl}${u.url}</loc>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemapXml);
console.log('[SEO] Generated sitemap.xml');
