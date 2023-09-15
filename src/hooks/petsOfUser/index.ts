import { useRecoilValue } from "recoil";
import { selector } from "recoil";
import { getPetsOfUserFromDB, getDataOfUserFromDB } from "../../lib/api";

export const petsOfUserState = selector({
    key: "petsOfUserState",
    get: async () => {
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
    },
});

export function useGetPetsOfUser() {
    const results = useRecoilValue(petsOfUserState);
    return results;
}
