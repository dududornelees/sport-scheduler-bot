const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("O seu Whatsapp foi conectado!");
});

client.on("message", (message) => {
    if (message.body === "!ping") {
        client.sendMessage(message.from, "pong");
    }
});

client.initialize();
