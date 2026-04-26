import { Home, Package, Palette } from "lucide-react"
import SideNav, { SideNavLink } from "@/ui/components/navigation/SideNav"

const ADMIN_LINKS: SideNavLink[] = [
    {
        label: "Page d'accueil",
        path: "/admin/homepage",
        icon: <Home size={20} strokeWidth={1.8} />,
    },
    {
        label: "Produits",
        path: "/admin/products",
        icon: <Package size={20} strokeWidth={1.8} />,
    },
    {
        label: "Identité visuelle",
        path: "/admin/brand-identity",
        icon: <Palette size={20} strokeWidth={1.8} />,
    },
]

export default function AdminSideNav() {
    return <SideNav links={ADMIN_LINKS} />
}
