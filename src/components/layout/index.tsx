import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";


export function Layout(){
    return  <div>
                <Navbar />
                    <Outlet />
            </div>
}