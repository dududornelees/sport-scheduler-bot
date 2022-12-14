import { Client, Buttons } from "whatsapp-web.js";
import { SportService } from "./services";
import { isToday, unifyHours } from "./helpers";

export const Messages = (client: Client) => {
    let name = "";
    let alreadyWelcome = false;

    client.on("message", async (message) => {
        const sports = await SportService.getSports();

        if (!name && !alreadyWelcome && !message.selectedButtonId) {
            client.sendMessage(message.from, "Olá, eu sou o atendente virtual da XXXXXXX!");
            client.sendMessage(message.from, "Para darmos início ao atendimento, digite o seu nome.");
            alreadyWelcome = true;
            return;
        }

        if (!name && alreadyWelcome && message.body !== null) {
            name = message.body;

            const button = new Buttons(`${name}, o que você deseja?`, [
                { id: "marcar-horario", body: "Marcar horário 🕛" },
                { id: "chamar-atendente", body: "Chamar um atendente 🙋‍♂️" }
            ]);

            client.sendMessage(message.from, button);
            return;
        }

        if (message.selectedButtonId === "marcar-horario") {
            const button = new Buttons("Em qual quadra você deseja marcar horário?", sports);
            client.sendMessage(message.from, button);
            return;
        }

        if (sports.some((sport: Sport) => sport.id === message.selectedButtonId)) {
            const freeTime = await SportService.getFreeTime();
            const scheduledDates = await SportService.getScheduledDates({ sportId: message.selectedButtonId });

            const scheduledHours = scheduledDates.map((scheduledDate: any) => {
                const scheduledDateConverted = new Date(scheduledDate.date.seconds * 1000);

                if (isToday(scheduledDateConverted)) {
                    return scheduledDateConverted.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                }
            });

            const freeTimeWithoutScheduled = freeTime.filter((time: any) => !scheduledHours.includes(time.time));

            client.sendMessage(
                message.from,
                `Nós temos os seguintes horários disponíveis:\n\n${unifyHours(
                    freeTimeWithoutScheduled
                )}\n\nDeseja marcar para qual horário?`
            );
        }
    });
};
