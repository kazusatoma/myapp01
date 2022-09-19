import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Authenticated from '../pages/Authenticated ';

export default function MyRouters() {
    return (
        <div className="site-layout-content">
            <Routes>
                <Route path='/authemticated' element={<Authenticated />} />
                <Route path='/' element={<Navigate to='/Authemticated'/>} />
            </Routes>
        </div>
    )
}