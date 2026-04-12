import * as React from "react"
import * as styles from "./ProductNavButton.module.css"

interface ProductNavButtonProps {
    isActive: boolean,
    onClick: () => void
}

const ProductNavButton: React.FC<ProductNavButtonProps> = ({ isActive, onClick }) => {
    return (
        <div 
            className={`${styles.productNavButton} ${isActive ? styles.active : ""}`} 
            onClick={onClick}
            >
            <div className={styles.burgerBar}></div>
            <div className={styles.burgerBar}></div>
            <div className={styles.burgerBar}></div>
        </div>
    )
}

export default ProductNavButton