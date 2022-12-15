import * as dotenv from "dotenv";
import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { Messages } from "./messages";

dotenv.config();

const client = new Client({ authStrategy: new LocalAuth() });

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("O seu Whatsapp foi conectado!");
});

Messages(client);

client.initialize();
