import { Client, Buttons } from "whatsapp-web.js";

export const Messages = (client: Client) => {
    let nome = "";
    let alreadyWelcome = false;

    client.on("message", (message) => {
        if (!nome && !alreadyWelcome && !message.selectedButtonId) {
            client.sendMessage(
                message.from,
                "Olá! Sou o atendente virtual da XXXXXXX!"
            );

            client.sendMessage(
                message.from,
                "Para darmos início ao atendimento, digite o seu nome."
            );

            alreadyWelcome = true;
            return;
        }

        if (!nome && alreadyWelcome && message.body !== null) {
            nome = message.body;

            const button = new Buttons(`${nome}, o que você deseja?`, [
                { id: "marcar-horario", body: "Marcar horário 🕛" },
                { id: "chamar-atendente", body: "Chamar um atendente 🙋‍♂️" },
            ]);

            client.sendMessage(message.from, button);
            return;
        }

        if (message.selectedButtonId === "marcar-horario") {
            const button = new Buttons(
                "Em qual quadra você deseja marcar horário?",
                [
                    { id: "marcar-horario-futebol", body: "Futebol ⚽" },
                    { id: "marcar-horario-volei", body: "Vôlei 🏐" },
                ]
            );

            client.sendMessage(message.from, button);
        }
    });
};
