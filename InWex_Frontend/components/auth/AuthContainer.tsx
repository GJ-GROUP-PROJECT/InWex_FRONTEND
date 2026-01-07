"use client"

import { useState } from 'react'
import LoginForm from './LoginForm';
import SignupAsEmp from './SignupAsEmp';
import SidePanel from './SidePanel';

const AuthContainer = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className='relative h-screen overflow-hidden bg-background'>
            <div className="grid grid-cols-2 h-full">
                <div className='flex items-center justify-center'>
                    {!isSignUp ? <LoginForm /> : <SignupAsEmp />}
                </div>
                <div />
            </div>

            {/* <SidePanel isSignup={isSignup} toggle={() => setIsSignup(!isSignup)} /> */}
        </div>
    )
}

export default AuthContainer