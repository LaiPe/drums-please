import styles from "./ViewportHeroWithText.module.css"
import BackgroundMedia, { type BackgroundMediaProps } from "@/ui/components/backgrounds/BackgroundMedia"

// This component is a wrapper around BackgroundMedia that adds a title overlay and some default styling for hero sections. 
// It takes the same props as BackgroundMedia, minus 'childrenClassName' and 'children', plus a title prop for the text overlay.
interface ViewportHeroWithTextProps extends Omit<BackgroundMediaProps, 'childrenClassName' | 'children'> {
    title?: string
    titleSpans?: [string, string] // Optional prop to allow pre-splitting the title into two spans if needed
}

export default function ViewportHeroWithText({ title, titleSpans: propTitleSpans, ...bgProps }: ViewportHeroWithTextProps) {
    let words: string[] = []
    let titleSpans: [string, string] | [string] = [""]

    if (title) {
        words = title.split(" ");
        titleSpans = words.length > 1
            ? [
                words.slice(0, Math.ceil(words.length / 2)).join(" "),
                words.slice(Math.ceil(words.length / 2)).join(" ")
            ]
            : [title]
    }
    
    if (propTitleSpans) {
        words = propTitleSpans?.length ? propTitleSpans : words;
        titleSpans = propTitleSpans?.length ? propTitleSpans : titleSpans;
    }
    return (
        <BackgroundMedia {...bgProps} childrenClassName={styles.heroGradient} containerClassName={`${bgProps.containerClassName ?? ''} ${styles.heroSection}`}>
            <h2 className={styles.heroTitle}>
                {words.length > 1 ? (
                    <>
                        <span>{titleSpans[0]}</span>
                        <span>{titleSpans[1]}</span>
                    </>
                ) : (
                    <span>{titleSpans[0]}</span>
                )}
            </h2>
        </BackgroundMedia>
    )
}