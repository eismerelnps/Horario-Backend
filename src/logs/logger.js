require('dotenv').config();
const winston = require("winston");
require("winston-mongodb");
require('winston-mail');
const TelegramLogger = require('winston-telegram')

const tlChatId = process.env.TL_CHAT_ID
const tlToken = process.env.TL_TOKEN





const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
  //defaultMeta: { service: 'Horario' },
  //useUnifiedTopology: true,
  transports: [
    new winston.transports.Console(),
//     new winston.transports.MongoDB({
//       db: "mongodb+srv://eismerlobaina:ZSPHBORwsvsUjeXg@learnmongodb.gopsm4k.mongodb.net/horarioDB",
//       collection: "log",
// //useUnifiedTopology: true
//     }),
    new TelegramLogger({
      token: tlToken,
      chatId: tlChatId,
      template: '[{level}] {message}'     
    }),
    // new winston.transports.Mail({
    //   to: 'eismerlobaina@gmail.com',
    // })
  ],
});







module.exports = logger;
