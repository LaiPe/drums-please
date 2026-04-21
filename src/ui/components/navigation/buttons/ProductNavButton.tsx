import styles from "./ProductNavButton.module.css"

interface ProductNavButtonProps {
    isActive: boolean,
    onClick: () => void
}

const ProductNavButton: React.FC<ProductNavButtonProps> = ({ isActive, onClick }) => {
    return (
        <button
            type="button"
            aria-label="Menu produits"
            aria-expanded={isActive}
            className={`${styles.productNavButton} ${isActive ? styles.active : ""}`}
            onClick={onClick}
        >
            <div className={styles.burgerBar}></div>
            <div className={styles.burgerBar}></div>
            <div className={styles.burgerBar}></div>
        </button>
    )
}

export default ProductNavButton