var Client = require('node-ssdp').Client
, client = new Client({
  explicitSocketBind: true
});

module.exports = client;