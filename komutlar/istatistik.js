const Discord = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
	const bot = await client.fetchApplication()
	const aylar = {
		"01": "Ocak",
		"02": "Şubat",
		"03": "Mart",
		"04": "Nisan",
		"05": "Mayıs",
		"06": "Haziran",
		"07": "Temmuz",
		"08": "Ağustos",
		"09": "Eylül",
		"10": "Ekim",
		"11": "Kasım",
		"12": "Aralık"
	}
	const duration = moment.duration(client.uptime).format(" D [gün] H [saat] m [dakika] s [saniye boyunca kesintisiz çalışıyor]")
	var helpers = ''

	if(client.ayarlar.yardimcilar[0]) {
		var helpers = ''
		for (var i = 0; i < client.ayarlar.yardimcilar.length; i++) {
			var şuanki = client.users.get(client.ayarlar.yardimcilar[i]).tag;
			if (i === 0) {
				helpers += şuanki
			}
			else if (i === client.ayarlar.yardimcilar.length - 1) {
				helpers += " ve " + şuanki;
			} else {
				helpers += ", " + şuanki
			}
		}
	}

	var destek = 'Bulunmuyor'
	if(client.ayarlar.destek !== "") var destek = `[Destek Sunucusuna Katıl!](${client.ayarlar.destek})`;

	const embed = new Discord.RichEmbed()
	.setAuthor(`${client.user.username} - Bot Hakkında`)
		.addField('Sürümler', `**Bot:** v${client.ayarlar.surum}\n**Discord.JS:** v12.0.0\n**Node.JS**: ${process.version}`, true)
		.addField('Veriler', `**Müzik Çalan Sunucu Sayısı:** ${client.voiceConnections.size.toLocaleString()}\n**Kullanıcı Sayısı:** ${client.users.size.toLocaleString()}\n**Sunucu Sayısı:** ${client.guilds.size.toLocaleString()}\n**Kanal Sayısı:** ${client.channels.size.toLocaleString()}`, true)
		.addField('Çalışma Süresi', `${duration}...`, false)
		.addField('Açılış Tarihi', `${moment(client.user.createdAt).format('DD')} ${aylar[moment(client.user.createdAt).format('MM')]} ${moment(client.user.createdAt).format('YYYY HH:mm:ss')}`, false)
		.addField("Botun Özel Linkleri", `[Sunucuna Ekle!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=3460672&scope=bot) | ${destek}`)
		.setTimestamp()
    .setThumbnail(`https://cdn.discordapp.com/attachments/719046240376979497/719250373675581470/ezgif-6-318cdd01436f.gif`)
		.setColor(client.ayarlar.renk)
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['botbilgi'],
	permLevel: 0,
	kategori: "bot"
}

exports.help = {
	komut: 'istatistik',
	aciklama: 'Bot hakkında bilgi verir.',
	kullanim: 'hakkında'
}
