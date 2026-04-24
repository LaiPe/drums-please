'use client'

import type React from 'react'
import { Heading4, Heading5, Pilcrow } from 'lucide-react'
import { SingleChoiceToggleGroup, convertSelectionToNode$, currentBlockType$, type BlockType } from '@mdxeditor/editor'
import { usePublisher, useCellValue } from '@mdxeditor/gurx'
import { $createParagraphNode } from 'lexical'
import { $createHeadingNode } from '@lexical/rich-text'

function TitreContents() {
    return (
        <>
            <Heading4 size={14} strokeWidth={2} />
            <span>Titre</span>
        </>
    )
}

function SousTitreContents() {
    return (
        <>
            <Heading5 size={14} strokeWidth={2} />
            <span>Sous-titre</span>
        </>
    )
}

function TexteContents() {
    return (
        <>
            <Pilcrow size={14} strokeWidth={2} />
            <span>Texte</span>
        </>
    )
}

const ITEMS: { title: string; value: BlockType; contents: React.ReactNode }[] = [
    { title: 'Titre (####)',        value: 'h4',        contents: <TitreContents /> },
    { title: 'Sous-titre (#####)',  value: 'h5',        contents: <SousTitreContents /> },
    { title: 'Texte normal',        value: 'paragraph', contents: <TexteContents /> },
]

export default function BlockTypeGroup() {
    const convertSelectionToNode = usePublisher(convertSelectionToNode$)
    const currentBlockType = useCellValue(currentBlockType$)

    function handleChange(blockType: BlockType | '') {
        switch (blockType) {
            case 'paragraph':
                convertSelectionToNode(() => $createParagraphNode())
                break
            case 'h4':
                convertSelectionToNode(() => $createHeadingNode('h4'))
                break
            case 'h5':
                convertSelectionToNode(() => $createHeadingNode('h5'))
                break
        }
    }

    return (
        <SingleChoiceToggleGroup<BlockType>
            value={currentBlockType as BlockType}
            onChange={handleChange}
            items={ITEMS}
        />
    )
}
