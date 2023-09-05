import { createTheme } from "@mui/material/styles";

export const locationButtonTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        "&.locationButton": {
                            width: "100%",
                            backgroundColor: "#191970",
                            "&:hover": {
                                backgroundColor: "#00004e",
                            },
                        },
                        "&.searchButton": {
                            color: "#fff",
                            backgroundColor: "#191970",
                            "&:hover": {
                                backgroundColor: "#00004e",
                            },
                        },
                    }),
                outlined: ({ theme }) =>
                    theme.unstable_sx({
                        "&.closeButton": {
                            alignSelf: "end",
                            marginBottom: "8px",
                        },
                    }),
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.locationContainer": {
                            padding: "0px",
                            maxWidth: "none",
                            // borderRadius: "8px",
                            // color: "green",
                            // width: "700px",
                        },
                        "&.searchContainer": {
                            display: "flex",
                            justifyContent: "center",
                            width: { xs: "100%" },
                            borderRadius: "6px",
                            // backgroundColor: "#191970",
                            backgroundColor: "#212121",
                        },
                        "&.mapboxContainer": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px",
                            width: {
                                xs: "100%",
                                sm: "90%",
                                md: "95%",
                                lg: "100%",
                            },
                            maxWidth: "none",
                            height: { xs: "80vh", sm: "85vh", lg: "88vh" },
                            padding: 2,
                            backgroundColor: "#212121",
                            borderRadius: "8px",
                        },
                    }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.searchInput": {
                            input: { color: "#fff" },
                            label: { color: "#fff" },
                            width: { xs: "100%", md: "90%" },
                            color: "#fff",
                            ".MuiInputBase-root": {
                                paddingRight: { xs: "6px", sm: "10px" },
                                gap: { xs: "10px", sm: "18px" },
                                backgroundColor: "#212121",
                            },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "white !important",
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#fff",
                            },
                        },
                    }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        backgroundColor: "#212121",
                        borderRadius: "8px",
                        width: "100%",
                    }),
            },
        },
    },
});
