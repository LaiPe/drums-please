import Link from "next/link"
import styles from "./NavModal.module.css"

interface NavModalProps {
    isOpen: boolean
    links: { name: string, path: string }[]
    pathname: string
    onSelfClick: () => void
}

const NavModal: React.FC<NavModalProps> = ({ isOpen, links, pathname, onSelfClick }) => {
    return (
        <div className={`${styles.navModal} ${isOpen ? styles.open : ""}`}>
            <ul className={styles.linkList}>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.path}
                            onClick={link.path === pathname ? (e) => { e.preventDefault(); onSelfClick() } : undefined}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavModal