import React from "react";
import { Outlet } from "react-router-dom";

export function Layout(){
    return  <div>
                <header style={{height: '10vh', backgroundColor: 'green', width: '100%'}}>Layout</header>
                <Outlet />
                <footer>Footer</footer>
            </div>
}