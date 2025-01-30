const answerCommand = require('../utils/interaction/answerCommand');
const openTicket = require('../utils/interaction/openTicket');
const closeTicket = require('../utils/interaction/closeTicket');
const changeCategory = require('../utils/interaction/changeCategory');

module.exports = {
    name: 'interactionCreate',
    run(interaction, client) {
        if (interaction.isChatInputCommand()) {
            answerCommand(interaction, client);
        } else if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'open-ticket':
                    openTicket(interaction, client);
                    break;
                case 'close-ticket':
                    closeTicket(interaction);
                    break;
            }
        } else if (interaction.isStringSelectMenu()) {
            changeCategory(interaction, client);
        }
    }
}