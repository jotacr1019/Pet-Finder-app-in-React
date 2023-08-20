// const API_BASE_URL = "http://localhost:8080";
const API_BASE_URL = "https://pet-finder-app-muig.onrender.com";

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
