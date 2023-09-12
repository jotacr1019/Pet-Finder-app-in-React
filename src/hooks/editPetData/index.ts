import { updatePetInDB } from "../../lib/api";

type petData = {
    id: number;
    name: string;
    location: string;
    imageUrl: string[];
    status: string;
    last_lat: number;
    last_lng: number;
};

export function useUpdatePetData() {
    async function updatePetData(petData: petData) {
        try {
            const token = localStorage.getItem("user_token");
            const response = await updatePetInDB(petData, token);
            if (response) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
        }
    }
    return {
        updatePetData,
    };
}
