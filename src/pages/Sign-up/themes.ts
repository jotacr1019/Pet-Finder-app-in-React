import { createTheme } from "@mui/material/styles";

export const signUpTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalContainer": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            minWidth: "375px",
                            maxWidth: "none",
                            height: "fit-content",
                            padding: {
                                xs: "50px 8px",
                                sm: "50px 12px",
                                md: "50px 15px",
                                lg: "50px 24px",
                            },
                            backgroundColor: "#4267ac",
                        },
                    }),
            },
        },
    },
});
