export default function cases(bot, m) {
    console.log(m);
    try {
        switch (m.cmd) {
            case "menu": {
                m.reply(m.chatId, m, {
                    contextInfo: {
                        externalAdReply: {
                            mediaType: 1,
                            title: "BETABOTZ RPG",
                            thumbnailUrl:
                                "https://telegra.ph/file/05daab7b42157c06636b3.jpg",
                            renderLargerThumbnail: true,
                            sourceUrl: ""
                        }
                    }
                });
                break;
            }
            default:
            // code
        }
    } catch (err) {
        console.log(err);
        m.reply("*ERROR:* " + err.message);
    }
}
