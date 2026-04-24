'use client'

import { forwardRef } from 'react'
import {
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    type Translation,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    BoldItalicUnderlineToggles,
    ListsToggle,
    Separator,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import BlockTypeGroup from './BlockTypeGroup'

const FR_TRANSLATIONS: Record<string, string> = {
    'toolbar.bold':               'Gras',
    'toolbar.removeBold':         'Supprimer le gras',
    'toolbar.italic':             'Italique',
    'toolbar.removeItalic':       "Supprimer l'italique",
    'toolbar.underline':          'Souligné',
    'toolbar.removeUnderline':    'Supprimer le souligné',
    'toolbar.bulletedList':       'Liste à puces',
    'toolbar.numberedList':       'Liste numérotée',
    'toolbar.checkList':          'Liste de cases à cocher',
    'toolbar.toggleGroup':        'Groupe de boutons',
    'toolbar.undo':               'Annuler',
    'toolbar.redo':               'Rétablir',
}

const translate: Translation = (key, defaultValue, interpolations) => {
    const fr = FR_TRANSLATIONS[key]
    if (!fr) return defaultValue
    if (!interpolations) return fr
    return fr.replace(/\{\{(\w+)\}\}/g, (_, k) => String(interpolations[k] ?? ''))
}

export default forwardRef<MDXEditorMethods, MDXEditorProps>(
    function InitializedMDXEditor(props, ref) {
        return (
            <MDXEditor
                {...props}
                ref={ref}
                translation={translate}
                plugins={[
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <BlockTypeGroup />
                                <Separator />
                                <BoldItalicUnderlineToggles />
                                <Separator />
                                <ListsToggle options={['bullet', 'number']} />
                            </>
                        ),
                    }),
                    headingsPlugin({ allowedHeadingLevels: [4, 5] }),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    markdownShortcutPlugin(),
                ]}
            />
        )
    }
)
