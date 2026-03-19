"use client"

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import LoginForm from './LoginForm'
import SignupAsEmp from './SignupAsEmp'
import SidePanel from './SidePanel'

const AuthContainer = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [isSignUp, setIsSignUp] = useState(() => {
        return searchParams.get('signup') === 'true'
    });

    const handleToggle = (signUpMode: boolean) => {
        setIsSignUp(signUpMode)

        const params = new URLSearchParams(searchParams.toString())
        if (signUpMode) {
            params.set('signup', 'true')
        } else {
            params.delete('signup')
        }

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='relative h-screen overflow-hidden bg-background'>
            <div className="flex h-full">
                <div className="w-1/2 flex items-center justify-center">
                    <LoginForm onSwitch={() => handleToggle(true)} />
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <SignupAsEmp onSwitch={() => handleToggle(false)} />
                </div>
            </div>

            <SidePanel isSignup={isSignUp} />
        </div>
    )
}

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="w-5 h-5 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
            </div>
        }>
            <AuthContainer />
        </Suspense>
    )
}