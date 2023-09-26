import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { updateUserInDB } from "../../lib/api";

type UserData = {
    full_name: string;
    email: string;
};

export const userDataUpdatedState = atom({
    key: "userDataUpdated",
    default: {
        full_name: "",
        email: "",
    },
});

export const useUserDataUpdated = () => useRecoilState(userDataUpdatedState);

export function useUpdateUserInDB() {
    async function updateUser(userData: UserData): Promise<boolean> {
        try {
            const token = localStorage.getItem("user_token");
            const response: boolean = await updateUserInDB(userData, token);
            if (response) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return false;
        }
    }
    return {
        updateUser,
    };
}
