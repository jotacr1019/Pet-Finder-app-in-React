// const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://pet-finder-app-muig.onrender.com";
// const API_BASE_URL = "http://localhost:6008";

type userData = {
    full_name: string;
    email: string;
};

type newPetData = {
    name: string;
    location: string;
    imageUrl: string[];
    status: string;
    last_lat: number;
    last_lng: number;
};

type petData = {
    id: number;
    name: string;
    location: string;
    imageUrl: string[];
    status: string;
    last_lat: number;
    last_lng: number;
};

export async function authUserInDB(email: string, password: string) {
    try {
        const response = await fetch(API_BASE_URL + "/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.status === 200) {
            const token = await response.json();
            return token;
        }
        if (response.status === 401) {
            console.log("Usuario o contraseña incorrectos");
            return null;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function createUserInDB(userData: any) {
    try {
        const response = await fetch(API_BASE_URL + "/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (response.status === 201) {
            // const data = await response.json();
            const token = await authUserInDB(userData.email, userData.password);
            return token;
        }
        if (response.status === 500) {
            console.log("Usuario no creado");
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updateUserInDB(userData: userData, token: string) {
    try {
        const response = await fetch(API_BASE_URL + "/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(userData),
        });
        if (response.status === 200) {
            return true;
        }
        if (response.status === 401) {
            console.log("Token inválido");
            return false;
        }
        if (response.status === 400) {
            console.log("No se envió la información completa");
            return false;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getDataOfUserFromDB(token: string) {
    try {
        const response = await fetch(API_BASE_URL + "/users", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (response.status === 302) {
            const data = await response.json();
            return data;
        }
        if (response.status === 401) {
            console.log("Token inválido");
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updatePasswordInDB(password: string, token: string) {
    try {
        const response = await fetch(API_BASE_URL + "/users/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                password,
            }),
        });
        if (response.status === 200) {
            return true;
        }
        if (response.status === 401) {
            console.log("Token inválido");
            return false;
        }
        if (response.status === 400) {
            console.log("No se envió la información completa");
            return false;
        }
        if (response.status === 500) {
            return false;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createPetInDB(petData: newPetData, token: string) {
    try {
        const response = await fetch(API_BASE_URL + "/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(petData),
        });
        if (response.status === 401) {
            console.log("Token inválido");
            return null;
        }
        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getPetsAroundZoneInDB(lat: number, lng: number) {
    try {
        const response = await fetch(
            API_BASE_URL + "/pets-cerca-de?lat=" + lat + "&lng=" + lng,
            {
                method: "GET",
            }
        );
        if (response.status === 302) {
            const data = await response.json();
            return data;
        }
        if (response.status === 400) {
            return false;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getPetsOfUserFromDB(userId: number) {
    try {
        const response = await fetch(
            API_BASE_URL + "/pets" + "?userId=" + userId,
            {
                method: "GET",
            }
        );
        if (response.status === 302) {
            const data = await response.json();
            return data;
        }
        if (response.status === 400) {
            return false;
        }
        if (response.status === 404) {
            console.log("No se encontraron mascotas");
            return false;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getDataOfPetInDB(token: string, petId: number) {
    try {
        const response = await fetch(
            API_BASE_URL + "/pets/pet" + "?petId=" + petId,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (response.status === 302) {
            const data = await response.json();
            return data;
        }
        if (response.status === 401) {
            console.log("Token inválido");
            return null;
        }
        if (response.status === 404) {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function updatePetInDB(petData: petData, token: string) {
    try {
        const response = await fetch(API_BASE_URL + "/pets", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(petData),
        });
        if (response.status === 401) {
            console.log("Token inválido");
            return false;
        }
        if (response.status === 500) {
            console.log("No se logró actualizar la mascota");
            return false;
        }
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function deletePetFromDB(petId: number, token: string) {
    try {
        const response = await fetch(API_BASE_URL + "/pets", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ petId }),
        });
        if (response.status === 401) {
            console.log("Token inválido");
            return false;
        }
        if (response.status === 500) {
            console.log("No se logró eliminar el reporte");
            return false;
        }
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createReportInDB(reportData) {
    try {
        const response = await fetch(API_BASE_URL + "/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });
        if (response.status === 400) {
            return false;
        }
        if (response.status === 500) {
            console.log("No se logró crear el reporte");
            return false;
        }
        if (response.status === 201) {
            // const data = await response.json();
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}
