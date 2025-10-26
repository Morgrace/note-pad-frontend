import { jsx, jsxs } from 'react/jsx-runtime';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { useState, useRef, useCallback, memo, useMemo } from 'react';
import { toast } from 'sonner';
import { headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, linkPlugin, linkDialogPlugin, imagePlugin, tablePlugin, codeBlockPlugin, codeMirrorPlugin, markdownShortcutPlugin, toolbarPlugin, UndoRedo, Separator, BoldItalicUnderlineToggles, BlockTypeSelect, ListsToggle, CreateLink, InsertImage, InsertTable, InsertThematicBreak, CodeToggle, MDXEditor } from '@mdxeditor/editor';
import { B as Button } from './router-BMu1Diwv.mjs';
import { I as Input } from './input-BRr6adUU.mjs';

function NoteMarkupEditor({
  ref,
  onContentChange,
  content
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
      codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
      codeMirrorPlugin({
        codeBlockLanguages: {
          js: "JavaScript",
          css: "CSS",
          html: "HTML",
          ts: "TypeScript",
          tsx: "TypeScript JSX",
          py: "Python"
        }
      }),
      markdownShortcutPlugin(),
      toolbarPlugin({
        toolbarContents: () => /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 sm:gap-2 p-2 sm:p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto", children: [
          /* @__PURE__ */ jsx(UndoRedo, {}),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(BoldItalicUnderlineToggles, {}),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(BlockTypeSelect, {}),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(ListsToggle, {}),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(CreateLink, {}),
          /* @__PURE__ */ jsx(InsertImage, {}),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(InsertTable, {}),
          /* @__PURE__ */ jsx(InsertThematicBreak, {}),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(CodeToggle, {})
        ] })
      })
    ],
    []
  );
  const handleBlur = useCallback(() => {
    const markdown = ref.current?.getMarkdown() || "";
    onContentChange(markdown);
  }, [onContentChange]);
  return /* @__PURE__ */ jsx(
    MDXEditor,
    {
      ref,
      placeholder: "Start writing your note...",
      className: "min-h-[350px] sm:min-h-[500px] md:min-h-[600px] px-3 sm:px-5 md:px-8 py-4 sm:py-5 md:py-6",
      contentEditableClassName: "prose prose-sm sm:prose-base md:prose-lg max-w-none",
      onBlur: handleBlur,
      markdown: content || "",
      plugins
    }
  );
}
const NoteMarkupEditor$1 = memo(NoteMarkupEditor);
function NoteEditor({ mutationFn, title, content }) {
  const [noteTitle, setNoteTitle] = useState(title || "");
  const [noteContent, setNoteContent] = useState(content || "");
  const isFirstRender = useRef(true);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      });
      navigate({
        to: "/notes"
      });
    },
    onError: (err) => {
      console.error("failed", err.message);
    }
  });
  const handleContentChange = useCallback((markdown) => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setNoteContent(markdown);
  }, []);
  const handleSaveNote = useCallback(() => {
    const latestContent = editorRef.current?.getMarkdown() || noteContent;
    if (!latestContent.trim() && !noteTitle) {
      console.warn("Cannot save an empty note");
      toast.warning("Note cannot be empty");
      return;
    }
    mutation.mutate({ title: noteTitle, content: latestContent });
  }, [noteTitle, noteContent]);
  const handleTitleChange = (e) => setNoteTitle(e.target.value);
  return /* @__PURE__ */ jsx("div", { className: "min-h-[80dvh] bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            variant: "ghost",
            size: "icon",
            className: "hover:bg-slate-100 hover:scale-110 transition-all shrink-0",
            children: /* @__PURE__ */ jsx(Link, { to: "..", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 sm:h-6 sm:w-6 text-slate-700" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-1 w-full sm:w-auto", children: /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Enter note title...",
            value: noteTitle,
            onChange: handleTitleChange,
            name: "noteTitle",
            className: "text-xl sm:text-2xl md:text-3xl font-bold border-none shadow-none focus-visible:ring-0 px-0 bg-transparent placeholder:text-slate-300"
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            disabled: mutation.isPending,
            onClick: handleSaveNote,
            className: "bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold px-4 sm:px-6 md:px-8 w-full sm:w-auto text-sm sm:text-base shrink-0",
            children: mutation.isPending ? "Saving..." : "Save Note"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-200" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsx(
      NoteMarkupEditor$1,
      {
        ref: editorRef,
        onContentChange: handleContentChange,
        content: noteContent
      }
    ) })
  ] }) });
}

export { NoteEditor as N };
//# sourceMappingURL=note-editor-DOmiOpom.mjs.map
