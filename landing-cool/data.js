require('dotenv').config();

const fallback = require('./defaults.json');

const appData = {
  name: fallback.name,
  domain: process.env.DOMAIN || fallback.domain,
  description: fallback.description,
  email: fallback.email,
  websiteName: fallback.websiteName,
  defaultLang: fallback.defaultLang,
  theme: fallback.theme,
  facebookApp: process.env.FACEBOOK_APP || fallback.facebookApp,
  analytics: process.env.ANALYTICS || fallback.analytics,
  keywords: process.env.KEYWORDS || fallback.keywords,
  author: fallback.author,
  authorUrl: fallback.authorUrl,
};

module.exports = appData;
