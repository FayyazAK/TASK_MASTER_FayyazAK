const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const config = require("./env");

function createServers(app) {
  const servers = {};

  if (config.SSL.enabled) {
    // HTTPS Server
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, "..", config.SSL.key)),
      cert: fs.readFileSync(path.join(__dirname, "..", config.SSL.cert)),
    };

    servers.https = https.createServer(httpsOptions, app);
    servers.https.listen(config.SSL.port);

    // HTTP Server (for redirecting to HTTPS)
    servers.http = http.createServer((req, res) => {
      const httpsUrl = `https://${req.headers.host}${req.url}`;
      res.writeHead(301, { Location: httpsUrl });
      res.end();
    });
    servers.http.listen(config.PORT);
  } else {
    // HTTP Server only
    servers.http = app.listen(config.PORT);
  }

  return servers;
}

module.exports = createServers;
