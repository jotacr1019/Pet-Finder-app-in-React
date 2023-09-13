const API_BASE_URL = process.env.API_BASE_URL;

type userData = {
    full_name: string;
    email: string;
};

type fullUserData = {
    full_name: string;
    email: string;
    password: string;
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

type reportData = {
    reporter_name: string;
    phone_number: string;
    message: string;
    petId: number;
    pet_name: string;
    userId: number;
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

export async function createUserInDB(userData: fullUserData) {
    try {
        const response = await fetch(API_BASE_URL + "/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (response.status === 201) {
            const token = await authUserInDB(userData.email, userData.password);
            return token;
        }
        if (response.status === 500) {
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
            return false;
        }
        if (response.status === 400) {
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
            return false;
        }
        if (response.status === 400) {
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
            return false;
        }
        if (response.status === 500) {
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
            return false;
        }
        if (response.status === 500) {
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

export async function createReportInDB(reportData: reportData) {
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
            return false;
        }
        if (response.status === 201) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}
