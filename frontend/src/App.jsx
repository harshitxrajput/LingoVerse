import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnBoardingPage from './pages/OnBoardingPage'

import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'

const App = () => {
    const { data:authData, isLoading, error } = useQuery({
        queryKey: ["authUser"],
        queryFn: async() => {
            const res = await axiosInstance.get("/auth/profile");
            return res.data;
        },
        retry: false
    });

    const authUser = authData?.user;
    return (
        <div className='h-screen' data-theme="night">
            <Routes>
                <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/signup"}/>} />
                <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
                <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
                <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/signup"} />} />
                <Route path='/call' element={authUser ? <CallPage /> : <Navigate to={"/signup"} />} />
                <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to={"/signup"} />} />
                <Route path='/onboarding' element={authUser ? <OnBoardingPage /> : <Navigate to={"/signup"} />} />
            </Routes>

            <Toaster />
        </div>
  )
}

export default App
