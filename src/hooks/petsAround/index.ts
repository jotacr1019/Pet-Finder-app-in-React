import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { atom } from "recoil";
import { getPetsAroundZoneInDB } from "../../lib/api";

type locationData = {
    lat: number;
    lng: number;
};

export const newPetsFoundState = atom({
    key: "newPetsFoundState",
    default: [],
});

export const usePetsFound = () => useRecoilState(newPetsFoundState);

export function useGetPetsAroundZone(): {
    getPetsAround: (data) => Promise<[]>;
} {
    async function getPetsAround(data: locationData) {
        try {
            const response = await getPetsAroundZoneInDB(data.lat, data.lng);
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
        getPetsAround,
    };
}
