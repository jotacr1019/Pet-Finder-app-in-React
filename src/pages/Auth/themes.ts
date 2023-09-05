import { createTheme } from "@mui/material/styles";

export const authTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.principalContainer": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: {
                                xs: "92.4vh",
                                sm: "90.4vh",
                                md: "90.4vh",
                            },
                            width: "100%",
                            maxWidth: "none",
                            minWidth: "375px",
                            backgroundColor: "#4267ac",
                        },
                    }),
            },
        },
    },
});
