'use strict';

exports.layout = function(content, data) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
  <script>
  window.__REDUX_DATA__ = ${JSON.stringify(data)};
  </script>
  <script src="/dist/js/index.js"></script>
  </body>
  </html>
`;
};
