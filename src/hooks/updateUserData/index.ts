import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { atom } from "recoil";
import { updateUserInDB } from "../../lib/api";


type userData = {
    full_name: string;
    email: string;
}

export const userDataUpdatedState = atom({
    key: "userDataUpdated",
    default: {
        full_name: "",
        email: ""
    },
});

export const useUserDataUpdated = () => useRecoilState(userDataUpdatedState);

export function useUpdateUserInDB() {
    async function updateUser(userData: userData) {
        try {
            const token = localStorage.getItem("user_token");
            const response = await updateUserInDB(userData, token);
            if(response){
                return true;
            } else {
                console.log("Usuario no actualizado");
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
        }
    }
    return {
        updateUser,
    };
}