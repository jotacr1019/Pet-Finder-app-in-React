import { useRecoilValue, useRecoilState } from "recoil";
import { atom } from "recoil";
import { updatePasswordInDB } from "../../lib/api";

// export const userPasswordUpdatedState = atom({
//     key: "userPasswordUpdated",
//     default: {
//         token: "",
//     },
// });

// export const useUserPasswordUpdated = () =>
//     useRecoilState(userPasswordUpdatedState);

export function usePasswordUserInDB() {
    async function updatePassword(password) {
        try {
            const token = localStorage.getItem("user_token");
            const response = await updatePasswordInDB(password, token);
            if (response) {
                return true;
            } else {
                console.log("Contraseña no actualizada");
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
        }
    }
    return {
        updatePassword,
    };
}
