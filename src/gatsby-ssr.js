import * as React from 'react';
import Cookies from 'js-cookie';
import { stripIndent } from 'common-tags';

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }, pluginOptions) => {
  if (process.env.NODE_ENV === `production` || pluginOptions.includeInDevelopment) {
    setHeadComponents([
      <script key="cookie-before-plugin-gtm">
        {(pluginOptions.cookies || []).forEach(cookie => Cookies.set(cookie.name, cookie.value, cookie.options))}
      </script>,
      <script
        key="plugin-gtm"
        dangerouslySetInnerHTML={{
          __html: stripIndent`
            ;(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${pluginOptions.id}');`,
        }}
      />,
    ]);

    setPreBodyComponents([
      <noscript
        key="plugin-gtm"
        dangerouslySetInnerHTML={{
          __html: stripIndent`
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=${pluginOptions.id}"
              height="0"
              width="0"
              style="display: none; visibility: hidden"
            ></iframe>`,
        }}
      />,
    ]);
  }
};
