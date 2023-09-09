import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { atom } from "recoil";
import { getDataOfPetInDB } from "../../lib/api";

export const newDataOfPetState = atom({
    key: "newDataOfPet",
    default: {},
});

export const usePetsOfUser = () => useRecoilState(newDataOfPetState);

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
