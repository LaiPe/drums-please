import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./NavModal.module.css"

interface NavModalProps {
    isOpen: boolean
    links: { name: string, path: string }[]
}

const NavModal: React.FC<NavModalProps> = ({ isOpen, links}) => {
    return (
        <div className={`${styles.navModal} ${isOpen ? styles.open : ""}`}>
            <ul className={styles.linkList}>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavModal