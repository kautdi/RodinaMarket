import { useState } from "react"
import { Link } from "react-router-dom"

function ManagerNavbar() {
    const [active, setActive] = useState<number>(0)

    async function Logout(){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("iduser")
        localStorage.removeItem("role")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("idcompany")
        localStorage.removeItem("cabinet")
        window.location.reload()
    }
    const navbarItems = [
        {
            title: 'Компании',
            path: '/admin/companys',
            
        },
        {
            title: 'Заказы',
            path: '/admin/zakazs',
           
        },
        {
            title: 'Товары',
            path: '/admin/tovars',
           
        },
    ]
    return (
        <nav className="company-navbar manager__navbar">
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

export default ManagerNavbar
