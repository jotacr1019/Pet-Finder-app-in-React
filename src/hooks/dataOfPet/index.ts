// import { useEffect } from "react";
// import { useRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
// import { atom, selector } from "recoil";
import { getDataOfPetInDB } from "../../lib/api";

// const atomDATA = atom({
//     key: "atomDATA",
//     default: {
//         id: "",
//     },
// });

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

// export const dataOfP = selector({
//     key: "dataOfP",
//     get: async ({ get }) => {
//         try {
//             const id1 = get(atomDATA).id;
//             console.log({ id1 });
//             // const params = useParams();
//             // const id = parseInt(params.id.split("-")[1]);
//             // console.log({ id });
//             if (id1 === "") {
//                 console.log('id === ""');
//                 return false;
//             } else {
//                 console.log(typeof id1);
//                 const id = parseInt(id1);
//                 console.log(typeof id);
//                 const token = localStorage.getItem("user_token");
//                 const response = await getDataOfPetInDB(token, id);
//                 console.log({ response });
//                 if (response) {
//                     return response;
//                 } else {
//                     return false;
//                 }
//             }
//         } catch (e) {
//             console.error("Ha habido un error: ", e);
//             return false;
//         }
//     },
// });

// export function useGetDataOfPet() {
//     const params = useParams();
//     // const idn = parseInt(params.id.split("-")[1]);

//     const [data, setData] = useRecoilState(atomDATA);

//     useEffect(() => {
//         setData({ id: params.id.split("-")[1] });
//         console.log(params.id);
//     }, [params.id]);

//     const results = useRecoilValue(dataOfP);
//     return results;
// }
