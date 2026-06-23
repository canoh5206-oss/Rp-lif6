const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Basit bir veritabanı (İsimler buraya eklenecek)
const doluOyuncular = ["icardi", "osimehn", "ferdi"];

client.on('messageCreate', (message) => {
    // Botun kendi mesajlarına cevap vermesini engelle
    if (message.author.bot) return;

    // .ara komutunu kontrol et
    if (message.content.startsWith('.ara')) {
        // .ara kısmından sonraki ismi al (.ara icardi -> icardi)
        const args = message.content.split(' ').slice(1).join(' ');
        
        if (!args) {
            return message.reply('Lütfen bir isim yaz! Örnek: `.ara icardi`');
        }

        // İsmi küçük harfe çevirerek veritabanında ara
        const arananIsim = args.toLowerCase();
        
        if (doluOyuncular.includes(arananIsim)) {
            message.reply(`🔴 **${args}** şu an bir takımda, yani DOLU!`);
        } else {
            message.reply(`🟢 **${args}** şu an boşta, alınabilir.`);
        }
    }
});

client.login(process.env.TOKEN);
