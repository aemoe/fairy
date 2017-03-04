'use strict';

exports.layout = function(content, data) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="root">${content}</div>
  <script src="/dist/js/index.js"></script>
  </body>
  </html>
`;
};
