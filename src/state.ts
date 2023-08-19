// import * as dotenv from "dotenv";
const API_BASE_URL = process.env.API_BASE_URL;
// dotenv.config();

type userData = {
    full_name: string;
    email: string;
};

type petData = {
    name: string;
    location: string;
    imageUrl: string;
    status: string;
    last_lat: number;
    last_lng: number;
};

const state = {
    data: {
        user: {
            userId: "",
            fullName: "",
            email: "",
        },
        petsOfUser: [],
        pet: {
            name: "",
            imageUrl: "",
            geoloc: {
                lat: 0,
                lng: 0,
            },
            location: "",
            status: "",
            id: "",
        },
        report: {
            reporterName: "",
            message: "",
            phoneNumber: "",
        },
        userGeoloc: {
            lat: 0,
            lng: 0,
        },
        petsAroundUser: [],
        userToken: "",
        RouteFromWelcome: "",
    },

    getState() {
        return this.data;
    },

    setState(newState) {
        this.data = newState;
        localStorage.setItem("pet-finder-state", JSON.stringify(newState));
        sessionStorage.setItem("pet-finder-state", JSON.stringify(newState));
    },

    loadStateFromLocalStorage() {
        const dataOfLocalStorage: any =
            localStorage.getItem("pet-finder-state");
        if (dataOfLocalStorage !== null) {
            this.setState(JSON.parse(dataOfLocalStorage));
            return this.getState();
        } else {
            const dataOfSessionStorage: any =
                sessionStorage.getItem("pet-finder-state");
            if (dataOfSessionStorage !== null) {
                this.setState(JSON.parse(dataOfSessionStorage));
                return this.getState();
            } else {
                return this.getState();
            }
        }
    },

    removeStateFromLocalStorage() {
        localStorage.removeItem("pet-finder-state");
        sessionStorage.removeItem("pet-finder-state");
        this.data = {
            user: {
                userId: "",
                fullName: "",
                email: "",
            },
            petsOfUser: [],
            pet: {
                name: "",
                imageUrl: "",
                geoloc: {
                    lat: 0,
                    lng: 0,
                },
                location: "",
                status: "",
                id: "",
            },
            report: {
                reporterName: "",
                message: "",
                phoneNumber: "",
            },
            userGeoloc: {
                lat: 0,
                lng: 0,
            },
            petsAroundUser: [],
            userToken: "",
            RouteFromWelcome: "",
        };
    },

    setRouteFromWelcome(RouteFromWelcome: string) {
        const currentState = this.getState();
        currentState.RouteFromWelcome = RouteFromWelcome;
        this.setState(currentState);
    },

    setLocationOfUser(lat: number, lng: number) {
        const currentState = this.getState();
        currentState.userGeoloc.lat = lat;
        currentState.userGeoloc.lng = lng;
        this.setState(currentState);
    },

    setDataOfPet(petData) {
        const currentState = this.getState();
        currentState.pet.id = petData.id;
        currentState.pet.name = petData.name;
        currentState.pet.userId = petData.userId;
        currentState.pet.location = petData.location;
        currentState.pet.imageUrl = petData.imageUrl;
        currentState.pet.geoloc.lat = petData.last_lat;
        currentState.pet.geoloc.lng = petData.last_lng;
        currentState.pet.status = petData.status;
        this.setState(currentState);
    },

    async authUser(email: string, password: string) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 200) {
                const token = await response.json();
                currentState.userToken = token;
                this.setState(currentState);
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
    },

    async createUserInDB(userData: any) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 201) {
                const data = await response.json();
                currentState.user.userId = data.id;
                currentState.user.fullName = data.full_name;
                currentState.user.email = data.email;
                this.setState(currentState);
                return data;
            }
            if (response.status === 500) {
                console.log("Usuario no creado");
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async validatePasswordInDB(password: string) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/auth/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    userId: currentState.user.userId,
                }),
            });
            if (response.status === 200) {
                return true;
            }
            if (response.status === 401) {
                return false;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async updatePasswordInDb(password: string) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/users/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + currentState.userToken,
                },
                body: JSON.stringify({
                    password,
                }),
            });
            if (response.status === 200) {
                const data = await response.json();
                currentState.userToken = data;
                this.setState(currentState);
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
    },

    async updateUserInDB(userData: userData) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + currentState.userToken,
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 200) {
                const data = await response.json();
                currentState.user.fullName = data.full_name;
                currentState.user.email = data.email;
                this.setState(currentState);
                return data;
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
    },

    async getDataOfUserFromDB() {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/users", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + currentState.userToken,
                },
            });
            if (response.status === 302) {
                const data = await response.json();
                currentState.user.userId = data.id;
                currentState.user.fullName = data.full_name;
                currentState.user.email = data.email;
                this.setState(currentState);
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
    },

    async getPetsAroundZone(lat: number, lng: number) {
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
    },

    async createPetInDB(petData: petData) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/pets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + currentState.userToken,
                },
                body: JSON.stringify(petData),
            });
            if (response.status === 401) {
                console.log("Token inválido");
                return null;
            }
            if (response.status === 201) {
                const data = await response.json();
                this.setDataOfPet(data);
                return data;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getPetsOfUserFromDB() {
        try {
            const currentState = this.getState();
            const response = await fetch(
                API_BASE_URL + "/pets" + "?userId=" + currentState.user.userId,
                {
                    method: "GET",
                }
            );
            if (response.status === 302) {
                const data = await response.json();
                currentState.petsOfUser = data;
                this.setState(currentState);
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
    },

    async updatePetInDB(petData) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/pets", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + currentState.userToken,
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
                const data = await response.json();
                this.setDataOfPet(data);
                return data;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async deletePetFromDB(petId) {
        try {
            const currentState = this.getState();
            const response = await fetch(API_BASE_URL + "/pets", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + currentState.userToken,
                },
                body: JSON.stringify({ petId }),
            });
            if (response.status === 401) {
                console.log("Token inválido");
                return false;
            }
            if (response.status === 500) {
                console.log("No se logró eliminar la mascota");
                return false;
            }
            if (response.status === 200) {
                return true;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async createReportInDB(reportData) {
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
                const data = await response.json();
                return data;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};

export { state };
