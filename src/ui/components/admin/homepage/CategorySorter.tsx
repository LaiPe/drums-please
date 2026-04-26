'use client'

import { useState } from 'react'
import { ProductCategory } from '@/lib/db/schema'
import styles from './CategorySorter.module.css'

type Props = {
    allCategories: ProductCategory[]
    defaultSelected?: number[]
    name?: string
}

export default function CategorySorter({
    allCategories,
    defaultSelected = [],
    name = 'categoryIds',
}: Props) {
    const [ordered, setOrdered] = useState<number[]>(() => {
        const valid = new Set(allCategories.map(c => c.id))
        return defaultSelected.filter(id => valid.has(id))
    })

    const selectedSet = new Set(ordered)

    function toggle(id: number) {
        setOrdered(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    function move(index: number, direction: -1 | 1) {
        const next = [...ordered]
        const target = index + direction
        if (target < 0 || target >= next.length) return
        ;[next[index], next[target]] = [next[target], next[index]]
        setOrdered(next)
    }

    const categoryById = Object.fromEntries(allCategories.map(c => [c.id, c]))

    return (
        <div className={styles.wrapper}>
            <input type="hidden" name={name} value={JSON.stringify(ordered)} />

            <div className={styles.checkList}>
                {allCategories.map(cat => (
                    <label key={cat.id} className={styles.checkItem}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={selectedSet.has(cat.id)}
                            onChange={() => toggle(cat.id)}
                        />
                        <span className={styles.checkLabel}>{cat.name}</span>
                    </label>
                ))}
            </div>

            {ordered.length > 0 && (
                <div className={styles.orderedList}>
                    <p className={styles.orderTitle}>Ordre d&apos;affichage</p>
                    {ordered.map((id, idx) => (
                        <div key={id} className={styles.orderRow}>
                            <span className={styles.orderIndex}>{idx + 1}</span>
                            <span className={styles.orderName}>{categoryById[id]?.name}</span>
                            <div className={styles.orderActions}>
                                <button
                                    type="button"
                                    className={styles.arrowBtn}
                                    onClick={() => move(idx, -1)}
                                    disabled={idx === 0}
                                    aria-label="Monter"
                                >↑</button>
                                <button
                                    type="button"
                                    className={styles.arrowBtn}
                                    onClick={() => move(idx, 1)}
                                    disabled={idx === ordered.length - 1}
                                    aria-label="Descendre"
                                >↓</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
