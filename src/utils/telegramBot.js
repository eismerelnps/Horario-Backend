const TelegramBot = require('node-telegram-bot-api');
const logger = require('../logs/logger'); // Importa el logger

const tlChatId = process.env.TL_CHAT_ID
const tlToken = process.env.TL_TOKEN

const bot = new TelegramBot(tlToken, { polling: true });


bot.on('message', (msg) => {
  const chatId = msg.chat.id;


  var bye = "bot";
  if (msg.text.toString().toLowerCase().includes(bye)) {
  bot.sendMessage(msg.chat.id, "hello " + msg.from.first_name );
  }

  // send a message to the chat acknowledging receipt of their message
  sendTelegramMessage(tlChatId, `mensaje de ${msg.from.username} ::: ${msg.text} ::: ${msg.chat.id} `);
});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
        "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        }
    });
    
    });

// Función para enviar un mensaje al grupo
function sendTelegramMessage(chatId, message) {
 
  bot.sendMessage(chatId, message)
 
    .then(() => {
     //logger.info(`Mensaje enviado a Telegram: ${message}`);
    })
    .catch((error) => {
      logger.error(`Error al enviar mensaje a Telegram: ${error}`);
    });
}

//module.exports = sendTelegramMessage;
for (let i = 0; i < 1000; i++) {
  setTimeout(() => {
    sendTelegramMessage(` ${i}`);
  }, 1000 * i);
}