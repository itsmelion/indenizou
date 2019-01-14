import React from 'react';

const fontStack = `
  -apple-system,
  BlinkMacSystemFont,
  "Helvetica Neue",
  Arial,
  sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
`;

const PoweredBy = (
  <a
    className="p1 link block"
    style={{
      fontFamily: fontStack,
      textAlign: 'center',
      fontSize: '.7rem',
    }}
    href="https://alia.ml/"
  >
    Powered by ΛLIΛ
  </a>
);

export default PoweredBy;
