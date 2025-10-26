import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { u as useAuthStore, B as Button } from './router-BMu1Diwv.mjs';
import { StickyNote, ArrowRight, Shield, Zap, Search, Download } from 'lucide-react';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-query';
import '@tanstack/react-devtools';
import '@tanstack/react-router-devtools';
import 'react';
import 'sonner';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'axios';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import '@tanstack/react-query-devtools';

function Home() {
  const user = useAuthStore((state) => state.user);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-10 sm:py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4 sm:mb-6 md:mb-8", children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "bg-teal-500 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300", children: /* @__PURE__ */ jsx(StickyNote, { className: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-white" }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3 md:space-y-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 tracking-tight px-4", children: "Write-it-down" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-600 px-4", children: "Professional Note-Taking for Developers" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed px-4", children: "A powerful markdown editor designed for professionals. Organize your thoughts, code snippets, and documentation with ease." }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4", children: user ? /* @__PURE__ */ jsx(Link, { to: "/notes", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "w-full sm:w-auto bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-lg font-semibold group text-white", children: [
      "Open My Notes",
      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" })
    ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Link, { to: "/signup", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "w-full sm:w-auto bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-lg font-semibold group text-white", children: [
        "Get Started Free",
        /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" })
      ] }) }),
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 shadow-md hover:shadow-lg transition-all hover:scale-105 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-lg font-semibold", children: "Sign In" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-12 sm:pt-16 md:pt-20 max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-teal-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-teal-200 transition-colors", children: /* @__PURE__ */ jsx(StickyNote, { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-teal-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3", children: "Rich Markdown" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed", children: "Full-featured markdown editor with syntax highlighting, tables, and code blocks." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-blue-200 transition-colors", children: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3", children: "Secure & Private" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed", children: "Your notes are encrypted and secure. Only you have access to your data." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:scale-105 group sm:col-span-2 md:col-span-1", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-amber-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-amber-200 transition-colors", children: /* @__PURE__ */ jsx(Zap, { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3", children: "Lightning Fast" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed", children: "Instant search, quick filters, and blazing-fast performance. Never wait." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-10 sm:pt-12 md:pt-16 max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-slate-200", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-5 md:mb-6 text-center", children: "Everything You Need" }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 sm:w-5 sm:h-5 text-teal-600" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm sm:text-base text-slate-900 mb-1", children: "Powerful Search" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-xs sm:text-sm", children: "Find any note instantly with our advanced search and filtering." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 sm:w-5 sm:h-5 text-teal-600" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm sm:text-base text-slate-900 mb-1", children: "Export Options" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-xs sm:text-sm", children: "Download your notes in multiple formats for easy sharing." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx(StickyNote, { className: "w-4 h-4 sm:w-5 sm:h-5 text-teal-600" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm sm:text-base text-slate-900 mb-1", children: "Smart Organization" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-xs sm:text-sm", children: "Tag and categorize your notes for perfect organization." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-teal-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 sm:w-5 sm:h-5 text-teal-600" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm sm:text-base text-slate-900 mb-1", children: "Always Secure" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-xs sm:text-sm", children: "Bank-level encryption keeps your data safe and private." })
          ] })
        ] })
      ] })
    ] }) })
  ] }) }) });
}

export { Home as component };
//# sourceMappingURL=index-3LFgwiCs.mjs.map
