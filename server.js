const express = require('express');
var uaParse = require('ua-parser-js');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
  const { headers } = request;
  const userAgent = uaParse(headers['user-agent']);

  let os = null;
  let ip = null;
  let lang = null;

  if (userAgent) {
    os = Object.keys(userAgent.os).map(key => userAgent.os[key]).join('; ');
    ip = request.ip ||
      request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      (request.connection.socket ? request.connection.socket.remoteAddress : null);
    const langHeader = headers['accept-language'].match(/.*(?=,)/);
    lang = Array.isArray(langHeader) ? langHeader[0] : null;
  }

  response.send({ os, ip, lang });
});

app.listen(port, () => { console.log(`listening at ${port}`); });
