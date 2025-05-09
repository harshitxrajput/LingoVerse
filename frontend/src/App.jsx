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
import PageLoader from './components/PageLoader'

import useAuthUser from './hooks/useAuthUser.js'

const App = () => {
    const { isLoading, authUser } = useAuthUser();

    const isAuthenticated = Boolean(authUser);
    const isOnboarded = authUser?.isOnboarded;

    if(isLoading) return<PageLoader />

    return (
        <div className='h-screen' data-theme="night">
            <Routes>
                <Route path='/' element={isAuthenticated && isOnboarded ? (<HomePage />) : (<Navigate to={!isAuthenticated ? "/signup" : "/onboarding"} />)} />

                <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={"/"} />} />

                <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />} />

                <Route path='/notifications' element={isAuthenticated ? <NotificationsPage /> : <Navigate to={"/signup"} />} />

                <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to={"/signup"} />} />

                <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to={"/signup"} />} />
                
                <Route path='/onboarding' element={isAuthenticated ? (!isOnboarded ? <OnBoardingPage /> : <HomePage />) : <Navigate to="/signup" />} />
            </Routes>

            <Toaster />
        </div>
  )
}

export default App
