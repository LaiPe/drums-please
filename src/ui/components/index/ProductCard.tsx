import Link from 'next/link'
import styles from './ProductCard.module.css'
import BackgroundMedia from '@/ui/components/backgrounds/BackgroundMedia'

interface ProductCardProps {
    title: string;
    imageSrc: string;
    link: string;
    key: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageSrc, link, ...props }) => {
    return ( 
        <BackgroundMedia 
            mediaType="image" 
            mediaSrc={imageSrc} 
            mediaClassName={styles.productImage} 
            containerClassName={styles.productCard}
            alt={`${title} card`}
            {...props}
        >
            <Link href={link}>
                <h3 className={styles.productTitle}>{title}</h3>
            </Link>
        </BackgroundMedia>
    )
}

export default ProductCard