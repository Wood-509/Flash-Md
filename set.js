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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0M4TjFpYzE1OGh5cUhzbGw0RGxtZitzYzRtcGFCeUg2UnRjZ2pwQlRIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUx4c29CTVo3dkRxL21MYzNaVDNXajl6Mis2eE9jcUpuV1hQMzFzNzJnWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTldNREhxMHpiSXA0dnJvRFBwa3Y4cTJFV2lva3VKKzRxNTQxaHNDWjJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoTFp1S1RXb1JaNi92OHhuV2pNRUtVd1VDb0s2aGo1YTFMdGN5SnBvL1FrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFBdnp5TWlEaEgvblJ5RDRjN0hPT29DRUNrRXY0Y3VvdXBiM2pVb0N1SE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikg5WVN4VTJ4YjNOWnAyUThEYjNYa3RLV2J3M0ZaMzVzTDgwYUNDd1BDUTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUIva1MvNkVPMDJXaHhhRVkxV3p0ZFg5aG5ZbERsbnoxMEpSMHpHL3Jtbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUJyZEM4WjFrVi9HdzhYMEt0eHA1U25wMHU1V3FQOHRnNFhnb3FFTTJrbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNFdm9zWVNUUk1PTytwTGZybFVMbE51TWdWSWJ1Q2phaHpWT0puSjZpcXhlakZWTnNMRnlnaGtLMFNBcE41YXBNcWRsekxJdHl3OHJwdXZ4SEV3SGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA0LCJhZHZTZWNyZXRLZXkiOiJneDdlMGhOdjd6aU5vZm16NjEvSkVGMVcvZGtCOEl3SGVsSXBJSzJYOStBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjE4MDk0MjQ4MjM0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNCNDExMjg3MzYwNjBBMTNGRDVEMzU2MDNEMENGRUMzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjkyNjUwNTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjR5ckt6a2pNVHBtaVBWR0J6MThuYUEiLCJwaG9uZUlkIjoiNWZlMDAwMjctOTAzYy00MTQ4LTgwZjQtYjUyMzg2ODk4ZGY0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilg4UkRyUjNrTkg5K3ZmRGhGRGVDVm1wa0w4Yz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxVlZrcUxhSTdGTzRBaHNGTWgwZUhjMWFFQjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNFQ4UllCRkciLCJtZSI6eyJpZCI6IjE4MDk0MjQ4MjM0OjQyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQaVg3b01ERUliN3liZ0dHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPc3ovWFJqMi80WmMrMUtYRllDbGw5dkIzMFM1YzdPQmRCcForaDFranpnPSIsImFjY291bnRTaWduYXR1cmUiOiJMcm0vczh6SkRQR29lVVJwNHZtbnhxZyswL1pORlFxMGd4a3VZc3dPYlozUEVtTkZ6bGFYTUJrOFZrUTJLaXpqMHh3QndEOWxSVjF4bmg3TzF2ZmFCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTVVQZXltMFEvQ0JJY2FqV1ZMSXFnZGczRmpuRjZOQ0lpN1NySWNTQ09TQ2hCSVlwK3cwSzF1cFNKbXJ0ZkZwbnJaQVlXM3ZJMjBZZWE3clhHbkM1aHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxODA5NDI0ODIzNDo0MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUck0vMTBZOXYrR1hQdFNseFdBcFpmYndkOUV1WE96Z1hRYVdmb2RaSTg0In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MjY1MDQ0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUd2YiJ9',
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
