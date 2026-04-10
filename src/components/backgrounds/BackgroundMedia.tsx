import * as React from "react"
import * as styles from "./BackgroundMedia.module.css"

interface BackgroundMediaProps {
    mediaType: "video" | "image";
    mediaSrc: string;
    children?: React.ReactNode;

    childrenClassName?: string;
    containerClassName?: string;
    mediaClassName?: string;
}

const BackgroundMedia: React.FC<BackgroundMediaProps> = ({ mediaType, mediaSrc, children, containerClassName, mediaClassName, childrenClassName }) => {
    return (
        <div className={`${styles.backgroundMedia} ${containerClassName}`}>
            {mediaType === "video" ? (
                <video autoPlay loop muted playsInline className={`${styles.media} ${mediaClassName}`}>
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={mediaSrc} alt="Background" className={`${styles.media} ${mediaClassName}`} />
            )}
            {children && <div className={`${styles.content} ${childrenClassName}`}>{children}</div>}
        </div>
    )
}

export default BackgroundMedia;