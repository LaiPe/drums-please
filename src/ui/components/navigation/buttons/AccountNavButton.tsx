import styles from "./AccountNavButton.module.css"

interface AccountNavButtonProps {
    isActive: boolean,
    onClick: () => void
}

const AccountNavButton: React.FC<AccountNavButtonProps> = ({ isActive, onClick }) => {
    return (
        <button
            type="button"
            aria-label="Menu compte"
            aria-expanded={isActive}
            className={`${styles.accountNavButton} ${isActive ? styles.active : ""}`}
            onClick={onClick}
        >
            <div className={styles.head}></div>
            <div className={styles.body}></div>
        </button>
    )
}

export default AccountNavButton