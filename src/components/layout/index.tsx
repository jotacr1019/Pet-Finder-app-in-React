import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar";
import css from "./index.module.css";

export function Layout(){
    return  <div>
                <Navbar />
                <Suspense fallback={<div className={css.loading}><div className={css.progress}></div></div>}>
                    <Outlet />
                </Suspense>
            </div>
}