import { getBrandIdentityLogo } from '@/lib/data/brandIdentity'
import BrandIdentityManager from '@/ui/components/admin/brand-identity/BrandIdentityManager'

export default async function AdminBrandIdentityPage() {
    const logo = await getBrandIdentityLogo()
    return <BrandIdentityManager logo={logo} />
}
