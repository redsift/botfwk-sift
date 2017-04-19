/**
 * Botfwk Demo Sift. DAG's 'Node1' node implementation
 */
'use strict';

var botfwk = require('./botfwk.js');
var builder = require('botbuilder');

var appId = process.env._BOTFWK_MICROSOFT_APP_ID || '';
var appPassword = process.env._BOTFWK_MICROSOFT_APP_PASSWORD || '';

var connector = new builder.ChatConnector({
  appId: appId,
  appPassword: appPassword
});

console.log('bot.js: _BOTFWK_MICROSOFT_APP_ID', appId);
console.log('bot.js: _BOTFWK_MICROSOFT_APP_PASSWORD', appPassword.replace(/^(.?).*?$/, function (m, p1, o, s) { return p1 + '***' }));

var bot = new builder.UniversalBot(connector);

// Entry point for DAG node
// got ={
//   in: ... // contains the key/value pairs that match the given query
//   with: ... // key/value pairs selected based on the with selection
//   lookup: ... // an array with result of lookup for a specific key
//   query: ... // an array containing the key hierarchy
// }
// for more info have a look at:
// http://docs.redsift.com/docs/server-code-implementation
module.exports = function (got) {
  const inData = got.in;
  var promises = [];

  for (var d of inData.data) {
    if (d.value) {
      try {
        // parse raw message
        var msg = JSON.parse(d.value);
        // extract address in format expected by by Bot Framework SDK
        var addr = botfwk.address(msg);
        var text = 'Hello, ' + msg.from.name + '! You wrote ' + msg.text;

        promises.push(
          new Promise(function (resolve, reject) {
            var reply = new builder.Message()
              .address(addr)
              .text(text);
            bot.send(reply, function (err) {
              if (err) {
                reject(err);
                return;
              }
              resolve();
            });
          }));
      } catch (ex) {
        console.error('bot.js: Error parsing value for: ', d.key);
        console.error('bot.js: Exception: ', ex);
        continue;
      }
    }
  }

  return promises;
};
