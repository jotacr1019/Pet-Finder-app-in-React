import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { authUserInDB } from "../../lib/api";

export const authDataState = atom({
    key: "authData",
    default: {
        email: "",
    },
});

export const useAuthData = () => useRecoilState(authDataState);

export function useAuthUserInDB() {
    async function login(email: string, password: string) {
        try {
            const userToken = await authUserInDB(email, password);
            if (userToken) {
                localStorage.setItem("user_token", userToken);
                return true;
            } else {
                console.error("Email o contraseña incorrecta");
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return false;
        }
    }
    return {
        login,
    };
}
