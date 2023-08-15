import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { AppRoutes } from "./router";


const root = createRoot(document.getElementById('root'));
root.render(<RecoilRoot>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </RecoilRoot>
);
