const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUduYm1FTGIwQTBEQ1ltbUlBK1NFTDAxYjRQREJybXV6TTI3anNMN0hucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiKzV3OUxHdmhZS1dMcWdBVjdscENTcFBORXRXYmxmdndZWStxWUNzNUF4ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTkcxNHVxS2lYckEzTkF5eHZjN0hEQ0h2bGNIU3J2WnE0S0J2cFVWMDI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqOGlVNlcweHJxaXYvdXR5QXZmOWF6OGVJcHBFSHE1RlNSaVQ5TW9GaEhnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRNUDVCOEhUUHBDeUNOTE96RXRVdytuaDlhN1NSVEc2S2JTVzgxL0pqWGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlLeWYraGJpYldDV2JocWpVUVZuMXloWW5KTUprQzBWQWl0ZTc3bEFxMWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1BwUzh2WVdTQzlJa3RkZ3pBUWtzSDdUQzJPdjNLVmhCakNYYmp4ZVgyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblFOZkl5NWlFbWZqSTkrVkE4SWpleG1sNW5YbXB1OUF5dVkvb3NyNWpWdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpLK01UdVk4VW16dnp5aUE1akJNNHhzcjFFQ2lvRVUzT3owZmZSS1BYaWgyNEZLeGMvd3ZHMHNNSDNsdnRpL2ErbW9VTUN5ZmRVUGUxZzcvL2MyNmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE2LCJhZHZTZWNyZXRLZXkiOiI2Q01JYVhhZ2R1by9zSnBVeUZGTkhLcU9hS09qeWpWZFdiM2tSSWxYakFjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE4MDk0MjQ4MjM0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkIwODQ1QkE5MTM2MkUwQThGQTQ4MjU2MTE2ODA0NTFBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgzMTU4NTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InVsTXBwQWtlU00yRGZiWDk1YjNoMkEiLCJwaG9uZUlkIjoiMjdmZDlmYzQtNWJjZi00NmFjLWE0ZjQtY2U2ZDRlNmVlMzA1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVrMEViUkFJTnY4TmNYL2h2ekZjUStMS0o4WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5ZUJTcUpaWG9iZ2JtbjVXSUxSTmJDY3NWNlk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN1FCTktNQVEiLCJtZSI6eyJpZCI6IjE4MDk0MjQ4MjM0OjIwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQT1g3b01ERU1HRGtMZ0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPc3ovWFJqMi80WmMrMUtYRllDbGw5dkIzMFM1YzdPQmRCcForaDFranpnPSIsImFjY291bnRTaWduYXR1cmUiOiJ2R3BLK0RtTjRIRDcyKzhUUVg0MWtISk9RbXpEcjVydmhnako4Q1RUOGhwZlM0bCs1bkFkQjQyekV1eDNYa1pjU1FzSDV0QlNDaUtpNlQ2Z296V09Edz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidjB2ZlNRaXVHbFBmckF5VE1oT3cycmZwTEplZE40MGMwdWgyaWNCMEp2WUhmQXNQZ2VmbURPREdocTRLK000QlZYM2JIelgzcGpNTklmUXZmT3lmaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxODA5NDI0ODIzNDoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUck0vMTBZOXYrR1hQdFNseFdBcFpmYndkOUV1WE96Z1hRYVdmb2RaSTg0In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4MzE1ODUzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUcvdCJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Sasuke",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "18094248234",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
