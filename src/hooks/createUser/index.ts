import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { atom } from "recoil";
import { createUserInDB } from "../../lib/api";


type userData = {
    full_name: string;
    email: string;
    password: string;
}

export const newUserDataState = atom({
    key: "newUserData",
    default: {
        full_name: "",
        email: "",
        password: "",
    },
});

export const useNewUserData = () => useRecoilState(newUserDataState);

export function useCreateUserInDB() {
    async function createUser(userData: userData) {
        try {
            const userToken = await createUserInDB(userData);
            if(userToken){
                localStorage.setItem("user_token", userToken);
                return true;
            } else {
                console.log("Usuario no creado");
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
        }
    }
    return {
        createUser,
    };
}