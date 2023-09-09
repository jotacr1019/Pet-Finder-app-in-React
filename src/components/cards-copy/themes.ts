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
                            // height: "fit-content",
                            // minHeight: {
                            //     xs: "92.4vh",
                            //     sm: "90.4vh",
                            //     md: "90.4vh",
                            // },
                            width: "100%",
                            // maxWidth: "none",
                            // minWidth: "375px",
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
                            // maxWidth: { xs: "300px", sm: "320px" },
                            // minWidth: { xs: "300px", sm: "320px" },
                            width: "100%",
                            // height: { xs: "365px", sm: "400px" },
                            color: "black",
                            height: "100%",
                            gap: "8px",
                            // display: "grid",
                            // placeContent: "center",
                            //
                            //
                            //
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
                            // backgroundColor: "#4267ac",
                            backgroundColor: "#e19568",
                        },
                        // "&.cardImageContainer": {
                        //     display: "flex",
                        //     // justifyContent: "center",
                        //     alignItems: "center",
                        //     width: "fit-content",
                        //     gap: "6px",
                        //     maxWidth: "100%",
                        //     height: {
                        //         xs: "230px",
                        //         sm: "250px",
                        //         md: "270px",
                        //         lg: "280px",
                        //     },
                        //     //
                        //     //
                        //     //
                        //     border: "2px solid blue",
                        //     // display: "flex",
                        //     // flexDirection: "row",
                        //     // overflow: "hidden",
                        //     // width: "100%",
                        //     animation: "bannermove 20s linear infinite",
                        //     "@keyframes bannermove": {
                        //         "0%": {
                        //             transform: "translate(100%)",
                        //         },
                        //         "100%": {
                        //             transform: "translate(-300%)",
                        //         },
                        //     },
                        // },
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
                        "&.fourCardImageContainer": {
                            display: "flex",
                            // justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content",
                            gap: "6px",
                            maxWidth: "100%",
                            height: {
                                xs: "230px",
                                sm: "250px",
                                md: "270px",
                                lg: "280px",
                            },
                            //
                            //
                            //
                            border: "2px solid blue",
                            // display: "flex",
                            // flexDirection: "row",
                            // overflow: "hidden",
                            // width: "100%",
                            animation: "bannermove 20s linear infinite",
                            "@keyframes bannermove": {
                                "0%": {
                                    transform: "translate(100%)",
                                },
                                "100%": {
                                    transform: "translate(-300%)",
                                },
                            },
                        },
                        "&.twoCardImageContainer": {
                            // display: "flex",
                            // justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content",
                            gap: "6px",
                            maxWidth: "100%",
                            height: {
                                xs: "230px",
                                sm: "250px",
                                md: "270px",
                                lg: "280px",
                            },
                            //
                            //
                            //
                            border: "2px solid blue",
                            display: "grid",
                            // flexDirection: "row",
                            overflow: "hidden",
                            // width: "100%",
                            animation: "bannermoveTwo 10s linear infinite",
                            animationDelay: "5s",
                            "@keyframes bannermoveTwo": {
                                "0%": {
                                    transform: "translate(100%)",
                                },
                                "100%": {
                                    transform: "translate(-100%)",
                                },
                            },
                        },
                        "&.threeCardImageContainer": {
                            display: "flex",
                            // justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content",
                            gap: "6px",
                            maxWidth: "100%",
                            height: {
                                xs: "230px",
                                sm: "250px",
                                md: "270px",
                                lg: "280px",
                            },
                            //
                            //
                            //
                            border: "2px solid blue",
                            // display: "flex",
                            // flexDirection: "row",
                            // overflow: "hidden",
                            // width: "100%",
                            animation: "bannermove 20s linear infinite",
                            "@keyframes bannermove": {
                                "0%": {
                                    transform: "translate(100%)",
                                },
                                "100%": {
                                    transform: "translate(-300%)",
                                },
                            },
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
                            bottom: 0,
                            opacity: 0,
                            transition: "0.3s ease-out",
                        },
                    }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: ({ theme }) =>
                    theme.unstable_sx({
                        "&,textTitle": {
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
                    }),
                body1: ({ theme }) =>
                    theme.unstable_sx({
                        "&.textBody": {
                            color: "rgb(134, 134, 134)",
                        },
                    }),
            },
        },
    },
});
