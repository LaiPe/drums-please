import * as React from "react"
import * as styles from "./BackgroundMedia.module.css"

interface BackgroundMediaProps {
    mediaType: "video" | "image";
    mediaSrc: string;
}

const BackgroundMedia: React.FC<BackgroundMediaProps> = ({ mediaType, mediaSrc}) => {
    return (
        <div className={styles.backgroundMedia}>
            {mediaType === "video" ? (
                <video autoPlay loop muted playsInline className={styles.media}>
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={mediaSrc} alt="Background" className={styles.media} />
            )}
        </div>
    )
}

export default BackgroundMedia;