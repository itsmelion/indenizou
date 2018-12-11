require('dotenv').config();

const appData = {
  name: process.env.NAME,
  domain: process.env.DOMAIN,
  defaultLang: process.env.DEFAULT_LANG,
  theme: process.env.THEME,
  analytics: process.env.ANALYTICS,
  keywords: process.env.KEYWORDS,
};

export default appData;
module.exports = appData;
