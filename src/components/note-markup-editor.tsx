import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { memo, useCallback, useMemo, useRef } from 'react'

function NoteMarkupEditor({
  ref,
  onContentChange,
  content,
}: {
  onContentChange: (markdown: string) => void
  content: string
  ref: React.RefObject<MDXEditorMethods | null>
}) {
  const plugins = useMemo(
    () => [
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      imagePlugin(),
      tablePlugin(),
      codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          js: 'JavaScript',
          css: 'CSS',
          html: 'HTML',
          ts: 'TypeScript',
          tsx: 'TypeScript JSX',
          py: 'Python',
        },
      }),
      markdownShortcutPlugin(),
      toolbarPlugin({
        toolbarContents: () => (
          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border-b border-slate-200">
            <UndoRedo />
            <Separator />
            <BoldItalicUnderlineToggles />
            <Separator />
            <BlockTypeSelect />
            <Separator />
            <ListsToggle />
            <Separator />
            <CreateLink />
            <InsertImage />
            <Separator />
            <InsertTable />
            <InsertThematicBreak />
            <Separator />
            <CodeToggle />
          </div>
        ),
      }),
    ],
    [],
  )

  const handleBlur = useCallback(() => {
    const markdown = ref.current?.getMarkdown() || ''
    onContentChange(markdown)
  }, [onContentChange])

  return (
    <MDXEditor
      ref={ref}
      placeholder="Start writing your note..."
      className="prose prose-lg max-w-none min-h-[600px] px-8 py-6"
      onBlur={handleBlur}
      markdown={content || ''}
      plugins={plugins}
    />
  )
}
export default memo(NoteMarkupEditor)
