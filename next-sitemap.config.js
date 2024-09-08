/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://le-neuilly.netlify.app', // L'URL de base de votre site
    generateRobotsTxt: true, // Génère un fichier robots.txt automatiquement
    sitemapSize: 7000, // Limite de pages par fichier sitemap
    changefreq: 'daily', // Fréquence de mise à jour
    priority: 0.7, // Priorité par défaut des pages
    generateIndexSitemap: true, // Génère un index des sitemaps
    exclude: ['/admin*', '/api*'], // Exclure toutes les routes admin et API du sitemap
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: '*',
                disallow: ['/admin', '/admin/*', '/api/*'], // Bloque l'accès aux pages admin et API dans robots.txt
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://le-neuilly.netlify.app/sitemap.xml', // Lien vers votre sitemap principal
        ],
    },
};
