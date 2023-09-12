import { useRecoilState } from "recoil";
import { atom } from "recoil";
import { createPetInDB } from "../../lib/api";

type petData = {
    name: string;
    location: string;
    imageUrl: string[];
    status: string;
    last_lat: number;
    last_lng: number;
};

export const newPetReportState = atom({
    key: "newPetReportState",
    default: {
        name: "",
        location: "",
        imageUrl: [],
        status: "",
        last_lat: 0,
        last_lng: 0,
    },
});

export const usePetReport = () => useRecoilState(newPetReportState);

export function useCreatePetReport() {
    async function createPetReport(data: petData) {
        try {
            const token = localStorage.getItem("user_token");
            const response = await createPetInDB(data, token);
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
        createPetReport,
    };
}
