const TelegramBot = require('node-telegram-bot-api');
const logger = require('../logs/logger'); // Importa el logger


const bot = new TelegramBot('6390735438:AAGJ1P-y4_eKhvhYCN5vTtW9ngclT1YD9fQ', { polling: true });


bot.on('message', (msg) => {
  const chatId = msg.chat.id;


  var bye = "bot";
  if (msg.text.toString().toLowerCase().includes(bye)) {
  bot.sendMessage(msg.chat.id, "hello " + msg.from.first_name );
  }

  // send a message to the chat acknowledging receipt of their message
  sendTelegramMessage(`mensaje de ${msg.from.username} ::: ${msg.text} ::: ${msg.chat.id} `);
});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
        "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        }
    });
    
    });

// Función para enviar un mensaje al grupo
function sendTelegramMessage(message) {
  //bot.sendMessage('-1002026078732', message)//test
  bot.sendMessage('996858215', message)
  //bot.sendMessage('1130881018', message)//nae
  //bot.sendMessage('-1002081177116/64', message)//project
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