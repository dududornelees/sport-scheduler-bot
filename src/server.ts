import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
import { Messages } from "./messages";

const client = new Client({});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("O seu Whatsapp foi conectado!");
});

Messages(client);

client.initialize();
