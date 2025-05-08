import React from 'react'
import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnBoardingPage from './pages/OnBoardingPage'

import { Toaster } from 'react-hot-toast'

const App = () => {
    return (
        <div className='h-screen' data-theme="night">
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/notifications' element={<NotificationsPage />} />
                <Route path='/call' element={<CallPage />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/onboarding' element={<OnBoardingPage />} />
            </Routes>

            <Toaster />
        </div>
  )
}

export default App
