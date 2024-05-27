import { useState } from "react"
import { Link } from "react-router-dom"

function CompanyNavbar() {
    const [active, setActive] = useState<number>(0)

   
    const navbarItems = [
        {
            title: 'Заказы',
            path: '/zakazs',
            
        },
        {
            title: 'Моя организация',
            path: '/profile',
            
        },
        {
            title: 'Товары',
            path: '/tovars',
           
        },
    ]
    return (
        <nav className="company-navbar">
            <ul className="navbar-items company-navbar__navbar-items">
                {
                    navbarItems.map((navbarItem, index) => (
                        <li key={index} className={`navbar-link company-navbar__navbar-link ${index === active ? "navbar-link__active" : ""}`} onClick={() => setActive(index)}>
                            <Link to={`${navbarItem.path}`} className="link">
                                <div className="item">
                                    <p className="link-name">{navbarItem.title}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
                
            </ul>
        </nav>
    )
}

export default CompanyNavbar
