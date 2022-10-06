import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import './index.css'

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import WatchScreen from "./screens/WatchScreen";

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleSidebar = () => setShowSidebar(!showSidebar)

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex mt-[10vh]">
                <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
                <div className="container mx-auto">
                    {children}
                </div>
            </div>
        </>
    )
}

const App = () => {
    const { accessToken, loading } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !accessToken) {
            navigate('/auth')
        }
    }, [loading, accessToken, navigate])

    return (
        <Routes>
            <Route path="/" element={
                <Layout>
                    <HomeScreen />
                </Layout>
            }>
            </Route>

            <Route path="/auth" element={<LoginScreen />}>
            </Route>

            <Route path="/search" element={
                <Layout>
                    <h1>Search Results</h1>
                </Layout>
            }>
            </Route>

            <Route path="/watch/:id" element={
                <Layout>
                    <WatchScreen />
                </Layout>
            }>
            </Route>

            <Route path="*" element={
                <Navigate to="/" replace />
            }>
            </Route>
        </Routes>
    );
}

export default App;