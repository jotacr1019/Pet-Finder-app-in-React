import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { getPetsOfUserFromDB, getDataOfUserFromDB } from "../../lib/api";

export const newPetsOfUserState = atom({
    key: "newPetsOfUser",
    default: [],
});

export const usePetsOfUser = () => useRecoilState(newPetsOfUserState);

export function useGetPetsOfUser() {
    async function getPetsOfUser() {
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
    return {
        getPetsOfUser,
    };
}
