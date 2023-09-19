import { getPetsOfUserFromDB, getDataOfUserFromDB } from "../../lib/api";

export async function getPetsOfUser() {
    try {
        const token = localStorage.getItem("user_token");
        const userData = await getDataOfUserFromDB(token);
        const userId = userData.id;
        const response = await getPetsOfUserFromDB(userId);
        if (response) {
            return response;
        } else {
            return [];
        }
    } catch (e) {
        console.error("Ha habido un error: ", e);
        return [];
    }
}
