import React from 'react'
import { Link } from 'gatsby'
import * as styles from './ProductCard.module.css'
import BackgroundMedia from '../backgrounds/BackgroundMedia'

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
            <Link to={link}>
                <h3 className={styles.productTitle}>{title}</h3>
            </Link>
        </BackgroundMedia>
    )
}

export default ProductCard