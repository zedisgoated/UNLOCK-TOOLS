const User = require('../models/User');

module.exports = {
    name: 'messageCreate',
    async run(message) {
        if (message.author.bot || !message.member) return;

        let user = await User.findOne({ id: message.author.id });

        if (!user) {
            user = new User({ id: message.author.id });
        }

        user.stats.text++;
        user.save();

        if (message.content.includes('<@1332663944732479540>')) {
            message.repl('Current prefix: `/`\nType `/help` for more informations')
        }
    }
}