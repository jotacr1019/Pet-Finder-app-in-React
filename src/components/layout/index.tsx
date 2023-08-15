import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";

export function Layout(){
    return  <div>
                {/* <header style={{height: '10vh', backgroundColor: 'green', width: '100%'}}>Layout</header> */}
                <Navbar />
                    <Outlet />
                <footer>Footer</footer>
            </div>
}