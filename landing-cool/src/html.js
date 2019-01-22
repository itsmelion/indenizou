/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import chatLauncher, { widgetUrl } from 'chatbot';
import app from '../data';

const isProd = true || process.env.NODE_ENV === 'production';

const HTML = ({
  htmlAttributes, headComponents, bodyAttributes,
  preBodyComponents, body, postBodyComponents,
}) => (
  <html
    dir="ltr"
    lang={app.defaultLang}
    prefix="og:http://ogp.me/ns#"
    {...htmlAttributes}
  >
    <head>
      <base href="/" />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="robots" content="INDEX, FOLLOW" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <link rel="alternate" hrefLang={app.defaultLang} href={`https://${ app.domain }?lang=${ app.defaultLang }`} />
      <link rel="alternate" hrefLang="x-default" href={`https://${ app.domain }`} />
      <meta property="og:locale" content={app.defaultLang} />
      <meta httpEquiv="content-language" content={app.defaultLang} />

      <meta name="reply-to" content={app.email} />
      <meta name="author" content={app.author} />

      <meta name="fragment" content="!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`http://${ app.domain }`} />
      <meta name="description" content={app.description} />
      <meta property="og:description" content={app.description} />
      <meta name="application-name" content={app.name} />
      <meta property="og:site_name" content={app.name} />
      <meta property="og:title" content={app.name} />
      <meta property="twitter:title" content={app.name} />
      <meta name="keywords" content={app.keywords} />
      <meta property="fb:app_id" content={app.facebookApp} />

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
      {isProd && <script dangerouslySetInnerHTML={{ __html: chatLauncher }} />}
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
