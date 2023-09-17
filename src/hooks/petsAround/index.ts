import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { atom, selector } from "recoil";
import { getPetsAroundZoneInDB } from "../../lib/api";

type locationData = {
    lat: number;
    lng: number;
};

const atomPetsAround = atom({
    key: "atomPetsAround",
    default: {
        lat: 0,
        lng: 0,
    },
});

const petsAroundZoneState = selector({
    key: "petsAroundZoneState",
    get: async ({ get }) => {
        try {
            const data: locationData = get(atomPetsAround);
            if (data.lat !== 0) {
                const response = await getPetsAroundZoneInDB(
                    data.lat,
                    data.lng
                );
                if (response) {
                    return response;
                } else {
                    return [];
                }
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return false;
        }
    },
});

export function useGetPetsAroundZone() {
    const params = useParams();
    const [data, setData] = useRecoilState(atomPetsAround);

    useEffect(() => {
        setData({
            lat: parseFloat(params.location.split("=")[2].split("&")[0]),
            lng: parseFloat(params.location.split("=")[3]),
        });
    }, [params.location]);

    const results = useRecoilValue(petsAroundZoneState);
    return results;
}
