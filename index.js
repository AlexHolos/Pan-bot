const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Pan está listo como ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.content === '!pan') {
    message.reply('🍞 Pan está aquí.');
  }
});

client.login(process.env.TOKEN);
