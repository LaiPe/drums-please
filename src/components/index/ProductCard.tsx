import Link from 'next/link'
import styles from './ProductCard.module.css'
import BackgroundMedia from '@/components/backgrounds/BackgroundMedia'

interface ProductCardProps {
    title: string;
    imageSrc: string;
    link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageSrc, link }) => {
    return ( 
        <BackgroundMedia 
            mediaType="image" 
            mediaSrc={imageSrc} 
            mediaClassName={styles.productImage} 
            containerClassName={styles.productCard}
        >
            <Link href={link}>
                <h3 className={styles.productTitle}>{title}</h3>
            </Link>
        </BackgroundMedia>
    )
}

export default ProductCard