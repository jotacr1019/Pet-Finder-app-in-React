import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { atom } from "recoil";
import { createPetInDB, getDataOfPetInDB } from "../../lib/api";

type petData = {
    name: string;
    location: string;
    imageUrl: string[];
    status: string;
    last_lat: number;
    last_lng: number;
};

export const newEditPetDataStore = atom({
    key: "newEditPetDataStore",
    default: {
        name: "",
        location: "",
        imageUrl: [],
        status: "",
        last_lat: 0,
        last_lng: 0,
    },
});

export const usePetDataStore = () => useRecoilState(newEditPetDataStore);

// export function useGetPetData() {
//     async function getPetData() {
//         try {
//             const token = localStorage.getItem("user_token");
//             const response = await getDataOfPetInDB(token);
//             if (response) {
//                 return true;
//             } else {
//                 return null;
//             }
//         } catch (e) {
//             console.error("Ha habido un error: ", e);
//         }
//     }
//     return {
//         getPetData,
//     };
// }

export function useUpdatePetData() {
    async function updatePetData(data) {
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
        updatePetData,
    };
}
