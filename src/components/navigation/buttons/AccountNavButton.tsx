import styles from "./AccountNavButton.module.css"

interface AccountNavButtonProps {
    isActive: boolean,
    onClick: () => void
}

const AccountNavButton: React.FC<AccountNavButtonProps> = ({ isActive, onClick }) => {
    return (
        <div 
            className={`${styles.accountNavButton} ${isActive ? styles.active : ""}`} 
            onClick={onClick}
        >
            <div className={styles.head}></div>
            <div className={styles.body}></div>
        </div>
    )
}

export default AccountNavButton