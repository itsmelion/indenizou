/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const {
  DEFAULT_LANG,
  DOMAIN,
  EMAIL,
  AUTHOR,
  DESCRIPTION,
  NAME,
  KEYWORDS,
  FACEBOOK_APP,
} = process.env;

const HTML = ({
  htmlAttributes, headComponents, bodyAttributes,
  preBodyComponents, body, postBodyComponents,
}) => (
  <html
    lang={DEFAULT_LANG}
    prefix="og:http://ogp.me/ns#"
    {...htmlAttributes}
  >
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no"
      />
      <meta name="robots" content="INDEX, FOLLOW" />

      <link rel="alternate" hrefLang={DEFAULT_LANG} href={`${ DOMAIN }?lang=${ DEFAULT_LANG }`} />
      <link rel="alternate" hrefLang="x-default" href={DOMAIN} />
      <meta property="og:locale" content={DEFAULT_LANG} />
      <meta httpEquiv="content-language" content={DEFAULT_LANG} />

      <meta name="reply-to" content={EMAIL} />
      <meta name="author" content={AUTHOR} />

      <meta name="fragment" content="!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`http://${ DOMAIN }`} />
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="application-name" content={NAME} />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={NAME} />
      <meta property="twitter:title" content={NAME} />
      <meta name="keywords" content={KEYWORDS} />
      <meta property="fb:app_id" content={FACEBOOK_APP} />

      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {postBodyComponents}
    </body>
  </html>
);

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

export default HTML;
