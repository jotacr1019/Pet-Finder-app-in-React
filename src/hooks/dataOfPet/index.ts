import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { atom, selector } from "recoil";
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

const atomDATA = atom({
    key: "atomDATA",
    default: {
        id: 0,
    },
});

export const dataOfP = selector({
    key: "dataOfP",
    get: async () => {
        try {
            // const id = get(atomDATA).id;
            const params = useParams();
            const id = parseInt(params.id.split("-")[1]);
            // console.log({ id });
            const token = localStorage.getItem("user_token");
            const response = await getDataOfPetInDB(token, id);
            // console.log({ response });
            if (response) {
                return response;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return false;
        }
    },
});

export function useDataOfP() {
    // const params = useParams();
    // const idn = parseInt(params.id.split("-")[1]);

    // const [data, setData] = useRecoilState(atomDATA);

    // useEffect(() => {
    //     setData({ id: idn });
    // }, [idn]);

    const results = useRecoilValue(dataOfP);
    return results;
}
