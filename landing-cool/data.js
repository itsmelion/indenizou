require('dotenv').config();

const fallback = require('./defaults.json');

const appData = {
  name: process.env.NAME || fallback.name,
  domain: process.env.DOMAIN || fallback.domain,
  description: process.env.DESCRIPTION || fallback.description,
  email: process.env.EMAIL || fallback.email,
  websiteName: process.env.WEBSITE_NAME || fallback.websiteName,
  defaultLang: process.env.DEFAULT_LANG || fallback.defaultLang,
  theme: process.env.THEME || fallback.theme,
  facebookApp: process.env.FACEBOOK_APP || fallback.facebookApp,
  analytics: process.env.ANALYTICS || fallback.analytics,
  keywords: process.env.KEYWORDS || fallback.keywords,
  author: process.env.AUTHOR || fallback.author,
  authorUrl: process.env.AUTHOR_URL || fallback.authorUrl,
};

module.exports = appData;
