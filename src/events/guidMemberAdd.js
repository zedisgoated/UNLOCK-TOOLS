require('dotenv').config();
const date = require('date-and-time');
const memberRole = process.env.MEMBER_ROLE;

module.exports = {
    name: 'guildMemberAdd',
    async run(member) {
        try {
            await member.roles.add(memberRole);
        } catch (err) {
            const currentDate = new Date();
            const currentDateFormatted = date.format(currentDate, 'DD/MM HH:mm:ss');
            console.log(`Failed to add member role to ${member.user.username} at ${currentDateFormatted}!\nPlease check my roles and permissions`.red);
        }
    }
}