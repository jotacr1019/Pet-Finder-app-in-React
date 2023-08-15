import React from "react";
import { Routes, Route } from "react-router-dom";
// import { Home } from "../pages/App/App";
import { Layout } from "../components/layout";
import { Welcome } from "../pages/App";
import { Auth } from "../pages/Auth";
import { CreateReport } from "../pages/Create-report";
import { EditData } from "../pages/Edit-data";
import { EditPassword } from "../pages/Edit-password";
import { EditReport } from "../pages/Edit-report";
import { Home } from "../pages/Home";
import { Menu } from "../pages/Menu";
import { SignUp } from "../pages/Sign-up";
import { UserReports } from "../pages/User-reports";


export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/create-report" element={<CreateReport />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/edit-data" element={<EditData />} />
                <Route path="/edit-password" element={<EditPassword />} />
                <Route path="/user-reports" element={<UserReports />} />
                <Route path="/edit-report" element={<EditReport />} />
            </Route>
        </Routes>
    )
}