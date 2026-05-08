import offlib_logo from '../assets/OFFLIB_LOGO_TRNS.png'

export default function Header() {
    // Main navigation links that will be on the left the header
    const mainNavLinks = [
        { name: 'Dashboard', href: '/maindashboard' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Manage Content', href: '/uploadandmanagement' },
    ];

    // Define the user-related links (profile, auth) and will be on the right
    const userNavLinks = [
        { name: 'Account Info', href: '/AccountInfo' },
        { name: 'Login', href: '/login' },
        { name: 'Sign Up', href: '/signup' },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                
                {/* OFFLIB Logo */}
                <a href='/'>
                    <img src={offlib_logo} width="30" height="30" alt="LOGO"/>
                </a>


                
                
                {/* Main Navigation Links (Left) */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {mainNavLinks.map((link) => (
                        <li className="nav-item" key={link.name}>
                            <a className="nav-link" href={link.href}>
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* User/Auth Navigation Links (Right) */}
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {userNavLinks.map((link) => (
                        <li className="nav-item" key={link.name}>
                            <a className="nav-link" href={link.href}>
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                </div>
        </nav>
    );
}

