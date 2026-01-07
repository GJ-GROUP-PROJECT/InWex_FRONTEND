"use client"

import { useState } from 'react'
import LoginForm from './LoginForm';
import SignupAsEmp from './SignupAsEmp';
import SidePanel from './SidePanel';

const AuthContainer = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className='relative h-screen overflow-hidden bg-background'>
            <div className="flex h-full">
                <div className="w-1/2 flex items-center justify-center">
                    <LoginForm onSwitch={() => setIsSignUp(true)} />
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <SignupAsEmp onSwitch={() => setIsSignUp(false)} />
                </div>
            </div>

            <SidePanel isSignup={isSignUp} />
        </div>
    )
}

export default AuthContainer