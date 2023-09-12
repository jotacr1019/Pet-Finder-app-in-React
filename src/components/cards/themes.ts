import { createTheme } from "@mui/material/styles";

export const homeCardTheme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.homeCardContainer": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            backgroundColor: "#4267ac",
                        },
                        "&.card": {
                            maxWidth: {
                                xs: "300px",
                                sm: "320px",
                                md: "350px",
                                lg: "360px",
                            },
                            minWidth: {
                                xs: "300px",
                                sm: "320px",
                                md: "350px",
                                lg: "360px",
                            },
                            height: {
                                xs: "365px",
                                sm: "400px",
                                md: "430px",
                                lg: "440px",
                            },
                            borderRadius: "20px",
                            background: "#f5f5f5",
                            position: "relative",
                            padding: "8px 16px",
                            border: "2px solid #c3c6ce",
                            transition: "0.5s ease-out",
                            overflow: "visible",
                            "&:hover": {
                                borderColor: "#008bf8",
                                boxShadow: "0 4px 18px 0 rgba(0, 0, 0, 0.45)",
                                "& .cardButton": {
                                    transform: "translate(-50%, 50%)",
                                    opacity: 1,
                                },
                            },
                        },
                        "&.cardDetails": {
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            color: "black",
                            height: "100%",
                            gap: "8px",
                            overflow: "hidden",
                        },
                        "&.titleContainer": {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "baseline",
                            gap: "8px",
                            width: "fit-content",
                            padding: "0px 14px",
                            borderRadius: "25px",
                            backgroundColor: "#e19568",
                        },
                        "&.cardImageStaticContainer": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content",
                            maxWidth: "100%",
                            height: {
                                xs: "222px",
                                sm: "250px",
                                md: "270px",
                                lg: "280px",
                            },
                        },
                        "&.secondaryContainer": {
                            width: "100%",
                            maxWidth: "none",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "4px",
                            padding: 2,
                            paddingTop: {
                                xs: "6px",
                                sm: "6px",
                            },
                            paddingRight: {
                                xs: "0",
                                sm: "0",
                                md: "0",
                                lg: "0",
                            },
                            backgroundColor: "#212121",
                            color: "white",
                        },
                        "&.notFoundContainer": {
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            maxWidth: { sm: "445px", md: "620px", lg: "690px" },
                            marginTop: { xs: "150px", sm: "80px", md: "36px" },
                        },
                    }),
            },
        },
        MuiList: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.listCard": {
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(300px,1fr))",
                            gap: { xs: "80px", sm: "90px" },
                            width: "100%",
                        },
                    }),
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.listItem": {
                            justifyContent: "center",
                            //
                            //
                            width: "100%",
                        },
                    }),
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: ({ theme }) =>
                    theme.unstable_sx({
                        "&.cardButton": {
                            transform: "translate(-50%, 125%)",
                            width: "60%",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#191970",
                            color: "#fff",
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            padding: "3px",
                            position: "absolute",
                            left: "50%",
                            // left: "21%",
                            bottom: 0,
                            // bottom: "-5%",
                            opacity: 0,
                            transition: "0.3s ease-out",
                        },
                    }),
                text: ({ theme }) =>
                    theme.unstable_sx({
                        "&.closeButton": {
                            minWidth: "0px",
                            fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                            alignSelf: "flex-end",
                            paddingRight: "6px",
                            color: "inherit",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: ({ theme }) =>
                    theme.unstable_sx({
                        "&.cardTitle": {
                            fontSize: {
                                xs: "1.6rem",
                                sm: "1.8rem",
                                md: "2rem",
                                lg: "2.1rem",
                            },
                            fontWeight: "bold",
                            marginBottom: "10px",
                            marginTop: "6px",
                            textAlign: "center",
                        },
                        "&.reportTitle": {
                            m: 0,
                            textAlign: "center",
                            fontSize: {
                                xs: "1.6rem",
                                sm: "1.7rem",
                                md: "1.9rem",
                                lg: "2.6rem",
                            },
                            padding: {
                                xs: "0px 56px 0px 40px",
                            },
                        },
                        "&.notFoundText": {
                            color: "#fff",
                            textAlign: "center",
                            fontSize: {
                                md: "2.8rem",
                            },
                        },
                    }),
                body1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.cardText": {
                            color: "rgb(134, 134, 134)",
                        },
                    }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.MuiPaper-root": {
                            backgroundColor: "#212121",
                            maxWidth: {
                                xs: "360px",
                                sm: "370px",
                                md: "400px",
                                lg: "470px",
                            },
                            minWidth: "330px",
                            borderRadius: "8px",
                        },
                    }),
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.dialogContent": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: { xs: "22px" },
                            padding: {
                                xs: "16px",
                                md: "26px 20px ",
                            },
                            backgroundColor: "#212121",
                            // color: "white",
                        },
                    }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) =>
                    theme.unstable_sx({
                        "&.messageTextField": {
                            input: { color: "#fff" },
                            label: { color: "#fff" },
                            width: "100%",
                            color: "#fff",
                            ".MuiInputBase-inputMultiline": {
                                color: "#fff",
                            },
                            // ".MuiInputBase-root": {
                            //     // paddingRight: { xs: "6px", sm: "10px" },
                            //     // gap: { xs: "10px", sm: "18px" },
                            //     // backgroundColor: "#212121",
                            //     color: "#fff",
                            // },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "white !important",
                            },
                            // "& .MuiInputBase-input.Mui-disabled": {
                            //     WebkitTextFillColor: "#fff",
                            // },
                        },
                    }),
            },
        },
    },
});
