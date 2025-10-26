import { jsx, jsxs } from 'react/jsx-runtime';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Plus, Search, SlidersHorizontal, Calendar, Tag, Star, Pencil, Download, Trash } from 'lucide-react';
import { useState } from 'react';
import { g as getNotes, B as Button, d as deleteNote } from './router-BMu1Diwv.mjs';
import { C as Card, c as CardContent } from './card-CNdZKGtC.mjs';
import { I as Input } from './input-BRr6adUU.mjs';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-devtools';
import '@tanstack/react-router-devtools';
import 'sonner';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'axios';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import '@tanstack/react-query-devtools';

function ErrorAllNotes({ error }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-[80dvh] items-center justify-center bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center bg-white rounded-lg shadow-xl p-8 max-w-md border border-slate-200", children: [
    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-8 h-8 text-red-600",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M6 18L18 6M6 6l12 12"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-red-600 mb-2", children: "Error loading notes" }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: error.message })
  ] }) });
}
function LoaderAllNotes() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-teal-500 mx-auto mb-4" }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-700 font-medium", children: "Loading your notes..." })
  ] }) });
}
function useDeleteNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    async onMutate(deleteId) {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const previousNotes = queryClient.getQueryData(["notes"]);
      if (!previousNotes?.data.notes) {
        console.warn("No data to update");
        return { previousNotes };
      }
      queryClient.setQueryData(["notes"], (old) => {
        const noteData = old.data.notes;
        return {
          ...old,
          data: { notes: noteData.filter((note) => note.id !== deleteId) }
        };
      });
      return {
        previousNotes
      };
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      });
    },
    onError(error, deleteId, context) {
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes"], context.previousNotes);
      }
      console.error(error.message);
    }
  });
  return mutation;
}
function NoteList({ notes }) {
  const [favorites, setFavorites] = useState(/* @__PURE__ */ new Set());
  const { isPending, mutate } = useDeleteNote();
  const toggleFavorite = (noteId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(noteId)) {
        newFavorites.delete(noteId);
      } else {
        newFavorites.add(noteId);
      }
      return newFavorites;
    });
  };
  const handleDownload = (note) => {
    console.log("Download note:", note.id);
  };
  return /* @__PURE__ */ jsx("ul", { className: "space-y-3 sm:space-y-4", children: notes.map((note) => {
    const isFavorite = favorites.has(note.id);
    return /* @__PURE__ */ jsxs(
      "li",
      {
        className: "group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-teal-300 hover:scale-[1.01] relative overflow-hidden",
        children: [
          isFavorite && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-[-18px] sm:top-3 sm:right-[-20px] bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] sm:text-xs font-bold py-1 px-6 sm:px-8 rotate-45 shadow-lg", children: "Favorite" }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2 sm:mb-3", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/notes/$id",
                  params: { id: note.id },
                  className: "flex-1 min-w-0 mr-2 sm:mr-4",
                  children: /* @__PURE__ */ jsx("div", { className: "flex items-start gap-2 sm:gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate group-hover:text-teal-600 transition-all mb-1.5 sm:mb-2", children: note.title || "Untitled Note" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 font-medium", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-7 sm:h-7 bg-teal-50 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Calendar, { className: "size-3.5 sm:size-[17px] stroke-teal-600" }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: new Date(note.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          }
                        ) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(Tag, { className: "h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-500" }),
                        /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[10px] sm:text-xs font-semibold", children: "Personal" })
                      ] })
                    ] })
                  ] }) })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "icon-sm",
                  variant: "ghost",
                  className: `${isFavorite ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50" : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"} hover:scale-110 transition-all shadow-sm shrink-0`,
                  onClick: () => toggleFavorite(note.id),
                  children: /* @__PURE__ */ jsx(
                    Star,
                    {
                      className: `h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? "fill-current" : ""}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-100", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  asChild: true,
                  size: "sm",
                  variant: "ghost",
                  className: "text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm",
                  children: /* @__PURE__ */ jsxs(Link, { to: "/notes/$id", params: { id: note.id }, children: [
                    /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Edit" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  disabled: true,
                  variant: "ghost",
                  className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm",
                  onClick: () => handleDownload(note),
                  children: [
                    /* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium hidden sm:inline", children: "Download" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-red-600 hover:text-red-700 hover:bg-red-50 transition-all flex items-center gap-1.5 sm:gap-2 ml-auto text-xs sm:text-sm",
                  disabled: isPending,
                  onClick: () => mutate(note.id),
                  children: [
                    /* @__PURE__ */ jsx(Trash, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Delete" })
                  ]
                }
              )
            ] })
          ] })
        ]
      },
      note.id
    );
  }) });
}
function PageNotes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const {
    isPending,
    error,
    data
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes
  });
  const notes = data?.data.notes || [];
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return (a.title || "").localeCompare(b.title || "");
  });
  if (isPending) return /* @__PURE__ */ jsx(LoaderAllNotes, {});
  if (error) return /* @__PURE__ */ jsx(ErrorAllNotes, { error });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900", children: "My Notes" }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-600 mt-2 sm:mt-3 text-base sm:text-lg font-medium", children: [
          notes.length,
          " ",
          notes.length === 1 ? "note" : "notes",
          " in total"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "default", className: "bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold w-full sm:w-auto", children: /* @__PURE__ */ jsxs(Link, { to: "/notes/new", children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4 sm:h-5 sm:w-5" }),
        "New Note"
      ] }) })
    ] }) }),
    notes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6 space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" }),
          /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Search notes by title...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 sm:pl-12 pr-3 sm:pr-4 py-5 sm:py-6 text-sm sm:text-base border border-slate-300 focus:border-teal-500 focus:ring-teal-500 bg-white rounded-lg shadow-sm" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => setFilterOpen(!filterOpen), className: `px-4 sm:px-6 ${filterOpen ? "bg-teal-500 text-white hover:bg-teal-600" : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"} shadow-sm rounded-lg transition-all`, children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4 sm:h-5 sm:w-5 mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base", children: "Filters" })
        ] })
      ] }),
      filterOpen && /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 p-4 animate-in slide-in-from-top-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Sort by:" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: sortBy === "date" ? "default" : "outline", onClick: () => setSortBy("date"), className: sortBy === "date" ? "bg-teal-500 hover:bg-teal-600" : "border-slate-300 hover:bg-slate-50", children: "Date" }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: sortBy === "title" ? "default" : "outline", onClick: () => setSortBy("title"), className: sortBy === "title" ? "bg-teal-500 hover:bg-teal-600" : "border-slate-300 hover:bg-slate-50", children: "Title" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-slate-500 italic", children: "More filters coming soon..." })
      ] }) })
    ] }),
    notes.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "shadow-lg border border-slate-200 bg-white", children: /* @__PURE__ */ jsx(CardContent, { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-teal-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md", children: /* @__PURE__ */ jsx(Plus, { className: "h-10 w-10 sm:h-14 sm:w-14 text-teal-500" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3", children: "No notes yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg px-4", children: "Get started by creating your first note" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold", children: /* @__PURE__ */ jsxs(Link, { to: "/notes/new", children: [
        /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "Create Note"
      ] }) })
    ] }) }) }) : filteredNotes.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "shadow-lg border border-slate-200 bg-white", children: /* @__PURE__ */ jsx(CardContent, { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-slate-100 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-md", children: /* @__PURE__ */ jsx(Search, { className: "h-10 w-10 sm:h-14 sm:w-14 text-slate-400" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3", children: "No notes found" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 mb-4 text-base sm:text-lg px-4", children: "Try adjusting your search or filters" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => {
        setSearchQuery("");
        setFilterOpen(false);
      }, variant: "outline", className: "border border-slate-300 hover:bg-slate-50", children: "Clear Search" })
    ] }) }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx(NoteList, { notes: filteredNotes }) })
  ] }) });
}

export { PageNotes as component };
//# sourceMappingURL=index-kE9huDEI.mjs.map
