import { deletePetFromDB } from "../../lib/api";

export function useDeleteReport() {
    async function deleteReport(petId: number) {
        try {
            const token = localStorage.getItem("user_token");
            const response = await deletePetFromDB(petId, token);
            if (response) {
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
        deleteReport,
    };
}
