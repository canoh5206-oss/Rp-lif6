const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// Uyanık tutma servisi (Render'ın botu kapatmaması için)
http.createServer((req, res) => {
  res.write("Bot aktif!");
  res.end();
}).listen(8080);

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.once('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('.ara')) {
        const args = message.content.split(' ').slice(1).join(' ');
        if (!args) return message.reply('Bir isim yazmalısın.');
        
        message.reply(`Aranan oyuncu: ${args} durumu kontrol ediliyor...`);
    }
});

client.login(process.env.TOKEN);
