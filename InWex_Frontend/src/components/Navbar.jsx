import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/images/CompanyLogoV2-TransparentBG.png'

const Navbar = () => {
    return (
        <>
            <nav className="bg-green-100 border-b border-green-200 px-8 py-1 shadow-sm">
                <div className="flex items-center justify-between max-w-[94rem] mx-auto">
                    <NavLink to='/'>
                        <div className="flex items-center space-x-2">
                            <img
                                className='h-22 w-auto'
                                src={logo}
                                alt='CompanyLogo'
                            />
                        </div>
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to='/' className="navLinks">Home</Link>
                        <Link to='#' className="navLinks">Dashboard</Link>
                        <Link to='#' className="navLinks">Reports</Link>
                        <Link to='#' className="navLinks">Settings</Link>
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