export function handler(bot, m) {
  console.log(m);
  m.reply("ini sebuah commands restart");
  
  return bot;
}

handler.onlyOwner = false;
handler.onlyPremium = false;