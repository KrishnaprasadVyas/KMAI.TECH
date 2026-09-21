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
const publicDir = path.resolve(__dirname, '../public');

const siteUrl = 'https://www.kmai.tech';
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

function parseArrayField(block, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`);
  const match = block.match(regex);
  if (!match) return [];
  return match[1]
    .split(',')
    .map(s => s.trim().replace(/^['"`]|['"`]$/g, '').trim())
    .filter(Boolean);
}

// 1. Read and parse projects data
const projectsContent = fs.readFileSync(projectsFile, 'utf-8');
const projects = [];
const objectBlocks = extractProjectBlocks(projectsContent);

for (const block of objectBlocks) {
  const slugMatch = block.match(/slug:\s*'([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const catMatch = block.match(/category:\s*'([^']+)'/);
  const descMatch = block.match(/description:\s*(['"`])([\s\S]*?)\1/);
  const challengeMatch = block.match(/challenge:\s*(['"`])([\s\S]*?)\1/);
  const solutionMatch = block.match(/solution:\s*(['"`])([\s\S]*?)\1/);
  const outcomeMatch = block.match(/outcome:\s*(['"`])([\s\S]*?)\1/);
  const ogImageMatch = block.match(/ogImage:\s*'([^']+)'/);
  const imageMatch = block.match(/\bimage:\s*'([^']+)'/);
  
  if (slugMatch && titleMatch) {
    projects.push({
      slug: slugMatch[1],
      title: titleMatch[1],
      category: catMatch ? catMatch[1] : 'Case Study',
      description: descMatch ? descMatch[2].replace(/\n/g, ' ').trim() : '',
      challenge: challengeMatch ? challengeMatch[2].replace(/\n/g, ' ').trim() : '',
      solution: solutionMatch ? solutionMatch[2].replace(/\n/g, ' ').trim() : '',
      outcome: outcomeMatch ? outcomeMatch[2].replace(/\n/g, ' ').trim() : '',
      technologies: parseArrayField(block, 'technologies'),
      deliverables: parseArrayField(block, 'deliverables'),
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

function createPageHtml(baseHtml, { title, description, url, image, type = 'website', schema, bodyContent }) {
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

  // Inject Page-Specific Semantic Body Content inside <noscript> (Prevents FOUC for JS users)
  if (bodyContent) {
    if (/<noscript>[\s\S]*?<\/noscript>/.test(html)) {
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n${bodyContent}\n    </noscript>`);
    } else {
      html = html.replace('</body>', `  <noscript>\n${bodyContent}\n  </noscript>\n</body>`);
    }
  }

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

  const title = `${project.title} — KMAI.tech Case Study`;
  const description = project.description;
  const url = `${siteUrl}/work/${project.slug}`;
  const image = project.ogImage.startsWith('http') ? project.ogImage : `${siteUrl}${project.ogImage}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: `${project.title} — KMAI.tech Case Study`,
    image: image,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'KMAI',
      alternateName: ['KMAI.tech', 'KMAI Studio'],
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'KMAI',
      alternateName: ['KMAI.tech', 'KMAI Studio'],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`
      }
    },
    description: description
  };

  const bodyContent = `      <!-- Semantic Static Fallback for Search & AI Crawlers (Replaced seamlessly by React on load) -->
      <main style="max-width: 1200px; margin: 0 auto; padding: 48px 24px;">
        <nav style="margin-bottom: 24px;">
          <a href="/" style="color: #216BFF; text-decoration: none;">&larr; Back to KMAI.tech</a>
        </nav>
        <article>
          <header>
            <p style="text-transform: uppercase; font-size: 14px; letter-spacing: 0.1em; color: #595D65;">${escapeHtml(project.category)}</p>
            <h1 style="font-size: 40px; margin: 8px 0 16px 0;">${escapeHtml(project.title)} — KMAI Case Study</h1>
            <p style="font-size: 18px; line-height: 1.6; color: #2D3139;">${escapeHtml(project.description)}</p>
          </header>

          ${project.challenge ? `
          <section style="margin-top: 32px;">
            <h2 style="font-size: 24px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">The Challenge</h2>
            <p style="font-size: 16px; line-height: 1.6;">${escapeHtml(project.challenge)}</p>
          </section>` : ''}

          ${project.solution ? `
          <section style="margin-top: 32px;">
            <h2 style="font-size: 24px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">The Engineering Solution</h2>
            <p style="font-size: 16px; line-height: 1.6;">${escapeHtml(project.solution)}</p>
          </section>` : ''}

          ${project.deliverables.length > 0 ? `
          <section style="margin-top: 32px;">
            <h2 style="font-size: 24px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Key Deliverables & Architectural Systems</h2>
            <ul>
              ${project.deliverables.map(d => `<li style="margin-bottom: 8px;">${escapeHtml(d)}</li>`).join('\n              ')}
            </ul>
          </section>` : ''}

          ${project.technologies.length > 0 ? `
          <section style="margin-top: 32px;">
            <h2 style="font-size: 24px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Technologies & Infrastructure</h2>
            <p>${escapeHtml(project.technologies.join(', '))}</p>
          </section>` : ''}

          ${project.outcome ? `
          <section style="margin-top: 32px;">
            <h2 style="font-size: 24px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Outcome</h2>
            <p style="font-size: 16px; line-height: 1.6;">${escapeHtml(project.outcome)}</p>
          </section>` : ''}

          <footer style="margin-top: 48px; border-top: 1px solid #ddd; padding-top: 24px;">
            <p>Built by <strong>KMAI.tech</strong> — Independent Creative Technology & Software Engineering Studio.</p>
            <p><a href="/#contact" style="color: #216BFF; font-weight: bold;">Start a project with KMAI &rarr;</a> | Email: <a href="mailto:contact@kmai.tech">contact@kmai.tech</a></p>
          </footer>
        </article>
      </main>`;

  const finalHtml = createPageHtml(templateHtml, {
    title,
    description,
    url,
    image,
    type: 'article',
    schema: articleSchema,
    bodyContent
  });

  fs.writeFileSync(path.resolve(projectDir, 'index.html'), finalHtml);
  console.log(`[SEO] Generated static file for /work/${project.slug}`);
}

// 3. Generate Sitemap
const urls = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
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

// 5. Ensure llms.txt, llms-full.txt, and robots.txt are copied to dist/
const filesToSync = ['llms.txt', 'llms-full.txt', 'robots.txt'];
for (const file of filesToSync) {
  const src = path.resolve(publicDir, file);
  const dest = path.resolve(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[SEO] Synced ${file} to dist/`);
  }
}
