import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalContainer": {
                            display: { xs: "grid", md: "flex" },
                            width: "100%",
                            maxWidth: "none",
                            height: { xs: "92.4vh", sm: "90.4vh" },
                            padding: { xs: "20px", md: "16px" },
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#4267ac",
                        },
                        "&.imageContainer": {
                            display: { xs: "flex", sm: "flex" },
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "none",
                            height: "100%",
                        },
                        "&.titleAndButtonsContainer": {
                            width: "100%",
                            maxWidth: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: { xs: "2px 16px", lg: "2px 16px 20px" },
                            gap: { xs: "14px", lg: "2px" },
                        },
                        "&.buttonsContainer": {
                            display: "flex",
                            flexDirection: "column",
                            width: { xs: "95%", sm: "80%", lg: "65%" },
                            maxWidth: "none",
                            gap: { xs: "14px", lg: "20px" },
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.title": {
                            textAlign: "center",
                            color: "#bdb76b",
                            fontWeight: "bold",
                            marginBottom: { lg: "35px" },
                            typography: {
                                xs: { fontSize: "3rem" },
                                sm: { fontSize: "4rem" },
                                md: { fontSize: "5.5rem" },
                            },
                        },
                    }),
                h4: ({ theme }) =>
                    theme.unstable_sx({
                        "&.subtitle": {
                            typography: {
                                xs: { fontSize: "1rem" },
                                sm: { fontSize: "1.2rem" },
                                md: { fontSize: "1.5rem" },
                            },
                            marginBottom: {
                                xs: "28px",
                                sm: "44px",
                                md: "80px",
                                lg: "130px",
                            },
                            textAlign: "center",
                            color: "#e0ffff",
                        },
                    }),
            },
        },
    },
});
