import { jsx } from 'react/jsx-runtime';
import { N as NoteEditor } from './note-editor-DOmiOpom.mjs';
import { b as createNote } from './router-BMu1Diwv.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
import 'lucide-react';
import 'react';
import 'sonner';
import '@mdxeditor/editor';
import './input-BRr6adUU.mjs';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-devtools';
import '@tanstack/react-router-devtools';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'axios';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import '@tanstack/react-query-devtools';

function PageCreateNote() {
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(NoteEditor, { mutationFn: createNote }) });
}

export { PageCreateNote as component };
//# sourceMappingURL=index-Au7FG2_B.mjs.map
