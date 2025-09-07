import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/images/CompanyLogoZoomed-TransparentBG.png'

const Navbar = () => {
    return (
        <>
            <nav className="py-1">
                <div className="flex items-center justify-between max-w-[96rem] h-22 mx-auto">
                    <NavLink to='/'>
                        <div className="flex items-center space-x-2">
                            <img
                                className='h-20 w-auto'
                                src={logo}
                                alt='CompanyLogo'
                            />
                            <div className="flex flex-col">
                                <h1 className="text-3xl text-gray-600 font-bold leading-none">InWex</h1>
                                <p className="text-gray-500 text-xs">
                                    Warehouse <span className='block'>Management System</span>
                                </p>
                            </div>
                        </div>
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to='/' className="navLinks">Home</Link>
                        <Link to='/about' className="navLinks">About us</Link>
                        <Link to='/faq' className="navLinks">FAQ</Link>
                    </div>

                    <div className='hidden md:flex items-center space-x-6'>
                        <Link to='/login' className='text-gray-600'>Log in</Link>
                        <Link to='/register' className='text-white bg-black hover:bg-gray-900 px-4 py-2 rounded transition-all duration-20'>Register</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 rounded-md text-green-800 hover:bg-green-200 transition-colors duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar