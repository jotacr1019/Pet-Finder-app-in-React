import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { createUserInDB } from "../../lib/api";

type UserData = {
    full_name: string;
    email: string;
    password: string;
};

export const newUserDataState = atom({
    key: "newUserData",
    default: {
        full_name: "",
        email: "",
        password: "",
    },
});

export const useNewUserData = () => useRecoilState(newUserDataState);

export function useCreateUserInDB() {
    async function createUser(userData: UserData): Promise<boolean> {
        try {
            const userToken: string | null = await createUserInDB(userData);
            if (userToken) {
                localStorage.setItem("user_token", userToken);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return null;
        }
    }
    return {
        createUser,
    };
}
