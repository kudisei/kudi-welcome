const Discord = require('discord.js');
const tokens = ["ODU3ODkzMTE4OTMwMDU5MzE3.YNWNOg.sw3T6JaYe9apzkBr1aOaZpDMW5E"];//kaç tane oda varsa o odaya girecek botların ayrı ayrı tokenleri
const chnls = ["853438538048864297"];//kaç oda varsa o odaların idleri
const selamlı = [];
for (let kudi = 0; kudi < 5; kudi++) {
    const token = tokens[kudi];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        console.log(`${client.user.username} giriş yaptı!`);
        client.user.setPresence({
            activity: { name:  " ❤️ " },
            status: "idle"      
          });
        concon = await client.channels.cache.get(chnls[kudi]).join()
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[kudi])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get("853438537789734982").rawPosition)) { // en alt yetkili rolid
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("853438537465856012").rawPosition)) { //unregisterolid
                ses = await concon.play('https://cdn.discordapp.com/attachments/856807536765698049/859455073486503936/hosgeldin.mp3');
                selamlı.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get('853438537789734982').rawPosition) {//en alt yetkili rol id
                ses = await concon.play('https://cdn.discordapp.com/attachments/856807536765698049/859455065609076806/yetkili.mp3');
                selamlı.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[kudi]) && (prev.channel.members.size === 1) && ses) ses.end();
    });

    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[kudi]).join();
    })
}