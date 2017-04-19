'use strict';

// Compilation of
// https://github.com/Microsoft/BotBuilder/blob/master/Node/core/src/utils.ts#L62
// https://github.com/Microsoft/BotBuilder/blob/master/Node/core/src/utils.ts#L76
function copyFieldsTo(frm, to, fields) {
    if (frm && to) {
        for (var f in fields) {
            if (frm.hasOwnProperty(f)) {
                if (typeof to[f] === 'function') {
                    to[fields[f]](frm[f]);
                }
                else {
                    to[fields[f]] = frm[f];
                }
            }
        }
    }
}

// Copy of https://github.com/Microsoft/BotBuilder/blob/master/Node/core/src/bots/ChatConnector.ts#L728
var toAddress = {
    'id': 'id',
    'channelId': 'channelId',
    'from': 'user',
    'conversation': 'conversation',
    'recipient': 'bot',
    'serviceUrl': 'serviceUrl',
    'useAuth': 'useAuth'
};

module.exports.address = address;
function address(msg) {
    var addr = {
        // useAuth is essential and will enable authentication support inside of Bot Framework SDK
        useAuth: true
    }
    copyFieldsTo(msg, addr, toAddress);
    return addr
}