"use client"

import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupAsEmp from './SignupAsEmp'
import SidePanel from './SidePanel'
import { useSearchParams } from 'next/navigation'

const AuthContainer = () => {
    const searchParams = useSearchParams()
    const [isSignUp, setIsSignUp] = useState(() => {
        return searchParams.get('signup') === 'true'
    });

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