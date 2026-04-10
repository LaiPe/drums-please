import { Link } from 'gatsby'
import * as React from "react"
import * as styles from "./header.module.css"
import ProductNavButton from '../components/navigation/buttons/ProductNavButton'
import AccountNavButton from '../components/navigation/buttons/AccountNavButton'
import NavModal from '../components/navigation/modal/NavModal'
import useViewport from '../hooks/useViewport'

/* TODO: extract navlinks to a separate file and import them here, then map over them to generate the nav items in the header. This will make it easier to maintain and update the navigation links in the future. */
const NAVLINKS = {
    "products-nav" : [
        { name: "Batteries Acoustiques", path: "/produits/bat-acoustiques" },
        { name: "Batteries Électroniques", path: "/produits/bat-electroniques" },
        { name: "Classiques", path: "/produits/classiques" },
        { name: "Traditionnelles", path: "/produits/traditionnelles" },
    ],
    "account-nav" : [
        { name: "Se Connecter", path: "/login" },
        { name: "S'inscrire", path: "/register" },
    ]
}

const Header: React.FC = () => {
    const [isProductNavOpen, setIsProductNavOpen] = React.useState(false);
    const [isAccountNavOpen, setIsAccountNavOpen] = React.useState(false);

    const toogleProductNav = () => {
        setIsProductNavOpen(!isProductNavOpen);
        setIsAccountNavOpen(false); // Close account nav when product nav is opened
    }

    const toogleAccountNav = () => {
        setIsAccountNavOpen(!isAccountNavOpen);
        setIsProductNavOpen(false); // Close product nav when account nav is opened
    }

    const { isMobile } = useViewport();
    const [logoSrc, setLogoSrc] = React.useState("/img/logos/logo-large-drums-please.png");

    React.useEffect(() => {
        console.log("Viewport changed: ", { isMobile });
        if (isMobile) {
            setLogoSrc("/img/logos/logo-mobile-drums-please.png");
        } else {
            setLogoSrc("/img/logos/logo-large-drums-please.png");
        }
    }, [isMobile]);

    return (
        <header className={styles.header}>
        <Link to="/">
            <img
                className={styles.logo}
                src={logoSrc}
                alt="logo-drums-please"
            />
        </Link>
        <nav className={styles.nav}>
            <div id="nav-produits" className={styles.subNav}>
                <ProductNavButton onClick={toogleProductNav} isActive={isProductNavOpen}></ProductNavButton>
                <NavModal isOpen={isProductNavOpen} links={NAVLINKS["products-nav"]}></NavModal>
            </div>
            <div id="nav-compte" className={styles.subNav}>
                <AccountNavButton onClick={toogleAccountNav} isActive={isAccountNavOpen}></AccountNavButton>
                <NavModal isOpen={isAccountNavOpen} links={NAVLINKS["account-nav"]}></NavModal>
            </div>
        </nav>
        </header>
    )
}
  

export default Header