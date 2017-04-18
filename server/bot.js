/**
 * Botfwk Demo Sift. DAG's 'Node1' node implementation
 */
'use strict';

var builder = require('botbuilder');
var botfwk = require('./botfwk.js');

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
        promises.push(botfwk.reply(msg, 'Hello, ' + msg.from.name + '! You wrote ' + msg.text));
      } catch (ex) {
        console.error('bot.js: Error parsing value for: ', d.key);
        console.error('bot.js: Exception: ', ex);
        continue;
      }
    }
  }

  return promises;
};
