import { atom, selector } from "recoil";
// const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://pet-finder-app-muig.onrender.com";



export const authDataState = atom({
    key: "authData",
    default: {
        email: "",
        password: "",
    },
});

console.log({ authDataState });


export const resultState = selector({
    key: "authDataState",
    get: async ({ get }) => {
        const data = get(authDataState);
        console.log({ data });
        
        const email = data.email;
        const password = data.password;

        if (email.length !== 0  && password.length !== 0) {
            const response = await fetch(API_BASE_URL + "/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            console.log({ response });
            
            if (response.status === 200) {
                const token = await response.json();
                return token;
            }
            if (response.status === 401) {
                console.log("Usuario o contraseña incorrectos");
                return null;
            }
        } else {
            return [];
        }
    },
});