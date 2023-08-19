import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
// import {
//     authDataState,
//     resultState,
// } from "../../atoms/auth";
import { atom, selector } from "recoil";




export const authDataState = atom({
    key: "authData",
    default: {
        email: "",
        password: "",
    },
});

console.log({ authDataState });


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

export const useAuthData = () => useRecoilState(authDataState);

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