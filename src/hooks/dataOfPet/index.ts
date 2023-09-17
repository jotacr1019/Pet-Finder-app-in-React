import { useParams } from "react-router-dom";
import { getDataOfPetInDB } from "../../lib/api";

export function useGetDataOfPet() {
    const params = useParams();
    const id = parseInt(params.id.split("-")[1]);
    async function getDataOfPet() {
        try {
            const token = localStorage.getItem("user_token");
            const response = await getDataOfPetInDB(token, id);
            if (response) {
                return response;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return false;
        }
    }
    return {
        getDataOfPet,
    };
}
