'use strict';

const shelljs = require('shelljs');

module.exports.setup = function(app) {
    var builder = require('botbuilder');
    var teams = require('botbuilder-teams');
    var config = require('config');

    if (!config.has("bot.appId")) {
        process.env.NODE_CONFIG_DIR = "../config";
        delete require.cache[require.resolve('config')];
        config = require('config');
    }
    var connector = new teams.TeamsChatConnector({
        appId: config.get("bot.appId"),
        appPassword: config.get("bot.appPassword")
    });
    
    var inMemoryBotStorage = new builder.MemoryBotStorage();    
    var bot = new builder.UniversalBot(connector, function(session) {
        var text = teams.TeamsMessage.getTextWithoutMentions(session.message);
        if (text.startsWith('kubectl get') || text.startsWith('kubectl describe')) {
            const result = shelljs.exec(`${text}`, { silent: true });
            if (result.code == 0) {
                session.send('```sh\n' + result.stdout + '\n```');
            } else {
                session.send(`Error (${result.code}): \`${result.stderr}\``);
            }
        } else {
            session.send('unknown command: ' + text + 'currently supported "kubectl get ..." and "kubectl describe ..."');
        }
    }).set('storage', inMemoryBotStorage);

    app.post('/api/messages', connector.listen());
    module.exports.connector = connector;
};
