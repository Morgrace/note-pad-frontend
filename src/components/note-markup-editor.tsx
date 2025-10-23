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
import { memo, useCallback, useMemo } from 'react'

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
          <div className="flex flex-wrap gap-1 sm:gap-2 p-2 sm:p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
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
      className="min-h-[350px] sm:min-h-[500px] md:min-h-[600px] px-3 sm:px-5 md:px-8 py-4 sm:py-5 md:py-6"
      contentEditableClassName="prose prose-sm sm:prose-base md:prose-lg max-w-none"
      onBlur={handleBlur}
      markdown={content || ''}
      plugins={plugins}
    />
  )
}
export default memo(NoteMarkupEditor)
