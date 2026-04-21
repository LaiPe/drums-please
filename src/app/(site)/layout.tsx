import Header from "@/ui/layouts/header"
import Footer from "@/ui/layouts/footer"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}