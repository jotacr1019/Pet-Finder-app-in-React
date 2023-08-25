import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { atom, selector } from "recoil";
import { authUserInDB } from "../../lib/api";

export const authDataState = atom({
    key: "authData",
    default: {
        email: "",
    },
});

export const useAuthData = () => useRecoilState(authDataState);

export function useAuthUserInDB() {
    async function login(email, password) {
        try {
            const userToken = await authUserInDB(email, password);
            if (userToken) {
                localStorage.setItem("user_token", userToken);
                return true;
            } else {
                console.error("Email o contraseña incorrecta");
                return false;
            }
        } catch (e) {
            console.error("Ha habido un error: ", e);
            return false;
        }
    }
    return {
        login,
    };
}

// export const resultState = selector({
//     key: "authDataState",
//     get: async ({ get }) => {
//         const data = get(authDataState);
//         console.log({ data });

//         const email = data.email;
//         const password = data.password;

//         if (email.length !== 0  && password.length !== 0) {
//             const response = await fetch(API_BASE_URL + "/auth/token", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             });
//             console.log({ response });

//             if (response.status === 200) {
//                 const token = await response.json();
//                 return token;
//             }
//             if (response.status === 401) {
//                 console.log("Usuario o contraseña incorrectos");
//                 return null;
//             }
//         } else {
//             return [];
//         }
//     },
// });

// export function useTokenData() {
//     // const params = useParams();
//     const [authData, setAuthData] = useRecoilState(authDataState);

//     // useEffect(() => {
//     //     setAuthData({ email: authData.email, password: authData.password });
//     // }, [authData]);

//     const tokenResult = useRecoilValue(resultState);
//     console.log({ tokenResult });
//     return tokenResult;
// }
