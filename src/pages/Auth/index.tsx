import React from "react";
import { FormAuth } from "../../components/formAuth";

export function Auth(){
    return <div style={{height: '90vh', width: '100%', backgroundColor: '#f2c2f5'}}>
                <FormAuth />
            </div>
}


// const currentState: any = state.loadStateFromLocalStorage();

// formEl.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     helpPasswordEl.style.visibility = "hidden";
//     helpEmailEl.style.visibility = "hidden";
//     const data = new FormData(e.target as any);
//     const value = Object.fromEntries(data.entries()) as any;
//     if (!value.email) {
//         helpEmailEl.style.visibility = "visible";
//     }
//     if (!value.password) {
//         helpPasswordEl.style.visibility = "visible";
//     }
//     if (value.email && value.password) {
//         helpEmailEl.style.visibility = "hidden";
//         helpPasswordEl.style.visibility = "hidden";
//         spanWaitEl.style.display = "flex";
//         spanWaitEl.classList.add("full-screen");
//         formEl.style.pointerEvents = "none";
//         const authUserResponse = await state.authUser(
//             value.email,
//             value.password
//         );
//         if (authUserResponse) {
//             const getDataOfUserResponse = await state.getDataOfUserFromDB();
//             if (getDataOfUserResponse) {
//                 if (currentState.RouteFromWelcome === "mis-datos") {
//                     setTimeout(() => {
//                         params.goTo("/menu");
//                     }, 1000);
//                 }
//                 if (currentState.RouteFromWelcome === "reportes") {
//                     const getPetsResponse =
//                         await state.getPetsOfUserFromDB();
//                     if (getPetsResponse) {
//                         setTimeout(() => {
//                             params.goTo("/user-reports-full");
//                         }, 1000);
//                     } else {
//                         setTimeout(() => {
//                             params.goTo("/user-reports-empty");
//                         }, 1000);
//                     }
//                 }
//                 if (currentState.RouteFromWelcome === "reportar") {
//                     setTimeout(() => {
//                         params.goTo("/create-report");
//                     }, 1000);
//                 }
//             } else {
//                 spanWaitEl.style.display = "none";
//                 formEl.style.pointerEvents = "auto";
//                 helpEmailEl.innerHTML =
//                     "Ha habido un error, por favor intente nuevamente";
//                 helpEmailEl.style.visibility = "visible";
//             }
//         } else {
//             spanWaitEl.style.display = "none";
//             formEl.style.pointerEvents = "auto";
//             helpEmailEl.innerHTML = "Email o contraseña incorrectos";
//             helpEmailEl.style.visibility = "visible";
//         }
//     }
// });
