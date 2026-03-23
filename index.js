const { 
  Client, 
  GatewayIntentBits, 
  ChannelType, 
  PermissionsBitField 
} = require('discord.js');

const OpenAI = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const openai = new OpenAI
  apiKey: process.env.OPENAI_sk-proj-BCibE6TjCEIGGfINCqGKwWMiOYJ_0Mcbabz082G-zXp3fvI1vl2SGWVTC36W1ez21MqNhehvdMT3BlbkFJOkL-9GiAoge-NthV4xoAzKwN-U0bVd2FfrZOhl9DLQ2SgWIodmzZUabUabH9-OpxIeIYCSs9oA;

const PREFIX = "k!";

client.once('ready', () => {
  console.log('🤖 Kekito PRO está listo!');
});


// 🟢 BIENVENIDAS
client.on('guildMemberAdd', member => {
  const canal = member.guild.channels.cache.find(c => c.name === 'bienvenida');
  if (!canal) return;

  canal.send(`👋 Bienvenido ${member.user}, disfruta el servidor con Kekito 🤖`);
});


// 🟡 LOGS
client.on('messageDelete', message => {
  const canal = message.guild.channels.cache.find(c => c.name === 'logs');
  if (!canal || !message.content) return;

  canal.send(`🗑 Mensaje eliminado de ${message.author}: ${message.content}`);
});


// 🟠 MENSAJES
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 🎫 CREAR TICKET
  if (message.content === 'k!ticket') {

    const canal = await message.guild.channels.create({
      name: `ticket-${message.author.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: message.author.id,
          allow: [PermissionsBitField.Flags.ViewChannel]
        }
      ]
    });

    canal.send(`🎫 Ticket creado para ${message.author}`);
    return message.reply('✅ Tu ticket fue creado');
  }


  // 🤖 CHAT IA (k! hola, etc)
  if (!message.content.toLowerCase().startsWith(PREFIX)) return;

  const texto = message.content.slice(PREFIX.length);

  // respuestas rápidas
  if (texto.toLowerCase().includes('hola')) {
    return message.reply(`👋 Hola ${message.author.username}, ¿cómo estás?`);
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres Kekito, un bot amigable, estilo Habbo, divertido y claro."
        },
        {
          role: "user",
          content: texto
        }
      ]
    });

    return message.reply(response.choices[0].message.content);

  } catch (error) {
    return message.reply("⚠️ Error con la IA.");
  }
});


client.loginprocess.env.MTQ3MzI4MTc0NTUxNTMxOTQ0MA.GX2NV1.nQBbiAoxYfYAF6VncmDfv9Oho0soI43DN1Zwuc;
