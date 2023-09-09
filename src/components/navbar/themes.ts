import { createTheme } from "@mui/material/styles";

export const navbarTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.navbarContainer": {
                            flexGrow: 1,
                            minWidth: 375,
                            maxWidth: "none",
                        },
                        "&.titleContainer": {
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            maxWidth: "none",
                        },
                    }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.appbar": {
                            backgroundColor: "#212121",
                        },
                    }),
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.avatar": {
                            mr: "5px",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h6: ({ theme }) =>
                    theme.unstable_sx({
                        "&.navbarTitle": {
                            color: "#bdb76b",
                        },
                    }),
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.iconButton": {
                            display: { xs: "flex", md: "none" },
                        },
                    }),
            },
        },
    },
});
