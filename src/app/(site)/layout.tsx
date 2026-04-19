import Header from "@/layouts/header"
import Footer from "@/layouts/footer"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}