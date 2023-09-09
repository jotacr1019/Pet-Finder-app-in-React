import { createTheme } from "@mui/material/styles";

export const menuDisplayTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.menuDisplayContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "none",
                            height: "70%",
                            padding: "10px",
                            border: "1px solid",
                            borderRadius: "6px",
                            boxShadow:
                                "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;",
                        },
                    }),
            },
        },
    },
});
