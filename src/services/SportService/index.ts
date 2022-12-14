import { db } from "../../services";
import { collection, query, getDocs, where, orderBy, limit } from "firebase/firestore";
import * as T from "./types";

export const SportService = {
    async getSports() {
        const q = query(collection(db, "sports"));
        const querySnapshot = await getDocs(q);

        let sports: any[] = [];
        querySnapshot.forEach((doc) => sports.push({ id: doc.id, body: doc.data().title }));

        return sports;
    },

    async getFreeTime() {
        const q = query(collection(db, "freeTime"), orderBy("time", "asc"));
        const querySnapshot = await getDocs(q);

        let freeTime: any[] = [];
        querySnapshot.forEach((doc) => freeTime.push({ id: doc.id, time: doc.data().time }));

        return freeTime;
    },

    async getScheduledDates({ sportId }: T.GetScheduledDates) {
        // TODO: Melhorar query e pegar apenas datas do dia "hoje".
        const q = query(collection(db, "scheduledDates"), where("sport", "==", sportId));

        const querySnapshot = await getDocs(q);

        let scheduledDates: any[] = [];
        querySnapshot.forEach((doc) => scheduledDates.push({ id: doc.id, date: doc.data().date }));

        return scheduledDates;
    }
};
