import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Welcome } from '../pages/App';
import { Auth } from '../pages/Auth';
import { CreateReport } from '../pages/Create-report';
import { EditReport } from '../pages/Edit-report';
import { Home } from '../pages/Home';
import { Menu } from '../pages/Menu';
import { SignUp } from '../pages/Sign-up';
import { UserReports } from '../pages/User-reports';
import '../index.css';


export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index path='/' element={<Welcome />} />
                <Route path='/home/:location' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/create-report' element={<CreateReport />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/user-reports' element={<UserReports />} />
                <Route path='/edit-report/:id' element={<EditReport />} />
            </Route>
        </Routes>
    )
}