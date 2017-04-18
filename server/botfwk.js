'use strict';

var builder = require('botbuilder');
const msAppID = process.env['_BOTFWK_MICROSOFT_APP_ID'] || '';
const msAppPwd = process.env['_BOTFWK_MICROSOFT_APP_PASSWORD'] || '';

console.log('bot.js: _BOTFWK_MICROSOFT_APP_ID', msAppID);
console.log('bot.js: _BOTFWK_MICROSOFT_APP_PASSWORD', msAppPwd.replace(/^(.?).*?$/, function (m, p1, o, s) { return p1 + '***' }));

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env._BOTFWK_MICROSOFT_APP_ID,
    appPassword: process.env._BOTFWK_MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);

// Exported methods

function reply(msg, text) {
    connector.prepIncomingMessage(msg);
    return new Promise(function (resolve, reject) {
        // check if connector has a token already
        if (connector.accessToken) {
            resolve();
            return
        }
        // otherwise get a new token
        connector.getAccessToken(function (err, token) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            msg.text = text;
            connector.send([msg], function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        })
    })
}

module.exports = {
    reply: reply,
};
