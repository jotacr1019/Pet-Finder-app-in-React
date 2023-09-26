import { updatePasswordInDB } from "../../lib/api";

export function usePasswordUserInDB() {
    async function updatePassword(password: string): Promise<boolean> {
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
            return false;
        }
    }
    return {
        updatePassword,
    };
}
