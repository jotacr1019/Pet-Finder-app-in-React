// const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://pet-finder-app-muig.onrender.com";

type userData = {
    full_name: string;
    email: string;
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
