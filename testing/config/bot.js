import fs from "fs";
import path from "path";

const pkg = JSON.parse(fs.readFileSync("package.json"));

global.bot = {
    name: "Chawnima bot",
    number: "",
    version: pkg["version"],
    prefix: ".",
    splitArgs: "|",
    locale: "id",
    timezone: "Asia/Jakarta",
    adsUrl: "",
    newsletterJid: "",
    commands: await (async () => {
        const commands = [];
        const commandsPath = path.join(process.cwd(), "commands");
        const files = fs
            .readdirSync(commandsPath, { recursive: true })
            .filter(file => file.endsWith(".js"));
        for await (let file of files) {
            const fileCont = await import(path.join(commandsPath, file));
            console.log(fileCont);
        }
        return commands;
    })(),
    setting: JSON.parse(fs.readFileSync("./config/setting.json")),
    saveSetting: function () {
        fs.writeFileSync(
            "./config/setting.json",
            JSON.stringify(global.bot.setting)
        );
        return global.bot.setting;
    }
};
console.log(bot.commands);

global.owner = {
    name: "foziz",
    number: "6285174174657"
};

global.db = {
    user: [],
    premium: [],
    group: [],
    save: async function (dbName) {}
};
