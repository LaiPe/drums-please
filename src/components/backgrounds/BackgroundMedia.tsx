import styles from "./BackgroundMedia.module.css"

export interface BackgroundMediaProps {
    mediaType: "video" | "image";
    mediaSrc: string;
    children?: React.ReactNode;
    alt?: string;

    childrenClassName?: string;
    containerClassName?: string;
    mediaClassName?: string;
}

const BackgroundMedia: React.FC<BackgroundMediaProps> = ({ mediaType, mediaSrc, children, containerClassName, mediaClassName, childrenClassName, alt, ...props }) => {
    return (
        <div className={`${containerClassName} ${styles.backgroundMedia}`} {...props}>
            {mediaType === "video" ? (
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className={`${mediaClassName} ${styles.media}`}
                >
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={mediaSrc} alt={alt || "Background"} className={`${mediaClassName} ${styles.media}`} />
            )}
            {children && <div className={`${childrenClassName} ${styles.content}`}>{children}</div>}
        </div>
    )
}

export default BackgroundMedia;