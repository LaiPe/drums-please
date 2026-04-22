import AdminSideNav from "@/ui/layouts/AdminSideNav"
import styles from "./admin.module.css"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.adminLayout}>
            <AdminSideNav />
            <main className={styles.adminMain}>
                {children}
            </main>
        </div>
    )
}
