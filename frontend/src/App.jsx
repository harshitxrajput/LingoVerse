import React from 'react'
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
import Layout from './components/Layout.jsx'

import useAuthUser from './hooks/useAuthUser.js'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
    const { isLoading, authUser } = useAuthUser();

    const { theme } = useThemeStore();

    const isAuthenticated = Boolean(authUser);
    const isOnboarded = authUser?.isOnboarded;

    if(isLoading) return<PageLoader />

    return (
        <div className='h-screen' data-theme={theme}>
            <Routes>
                <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

                <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

                <Route path='/onboarding' element={isAuthenticated ? (!isOnboarded ? <OnBoardingPage /> : <Navigate to={"/"} />) : <Navigate to="/login" />} />

                <Route path='/' element={isAuthenticated && isOnboarded ? (<Layout showSideBar={true}><HomePage /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />

                <Route path='/notifications' element={isAuthenticated && isOnboarded ? (<Layout showSideBar={true}><NotificationsPage /></Layout>) : <Navigate to={"/login"} />} />

                <Route path='/chat/:id' element={isAuthenticated && isOnboarded ? <Layout showSideBar={true}><ChatPage /></Layout> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />

                <Route path='/call/:id' element={isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
            </Routes>

            <Toaster />
        </div>
  )
}

export default App
