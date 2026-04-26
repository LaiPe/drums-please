import { BrandIdentityLogo } from '@/lib/db/schema'
import LogoSectionCard from './LogoSectionCard'
import styles from './BrandIdentityManager.module.css'

type Props = {
    logo: BrandIdentityLogo | null
}

export default function BrandIdentityManager({ logo }: Props) {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <p className={styles.breadcrumb}>Administration</p>
                    <h1 className={styles.title}>Identité visuelle</h1>
                </div>
            </div>
            <div className={styles.sections}>
                <LogoSectionCard logo={logo} />
            </div>
        </div>
    )
}
