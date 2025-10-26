import { jsx } from 'react/jsx-runtime';
import { useLoaderData, useParams } from '@tanstack/react-router';
import { a as updateNote } from './router-BMu1Diwv.mjs';
import { N as NoteEditor } from './note-editor-DOmiOpom.mjs';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-query';
import '@tanstack/react-devtools';
import '@tanstack/react-router-devtools';
import 'react';
import 'sonner';
import 'lucide-react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'axios';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import '@tanstack/react-query-devtools';
import '@mdxeditor/editor';
import './input-BRr6adUU.mjs';

function RouteComponent() {
  const note = useLoaderData({
    from: "/_authenticated/notes/$id"
  });
  const {
    id
  } = useParams({
    from: "/_authenticated/notes/$id"
  });
  const noteTitle = note.data?.note.title || "";
  const noteContent = note.data?.note.content || "";
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(NoteEditor, { mutationFn: (noteData) => updateNote(id, noteData), title: noteTitle, content: noteContent }) });
}

export { RouteComponent as component };
//# sourceMappingURL=_id-DOGANQtW.mjs.map
