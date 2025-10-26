import { jsx, jsxs } from 'react/jsx-runtime';
import { useNavigate, useSearch, Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Github } from 'lucide-react';
import { u as useAuthStore, B as Button } from './router-BMu1Diwv.mjs';
import { I as Input } from './input-BRr6adUU.mjs';
import { C as Card } from './card-CNdZKGtC.mjs';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-query';
import '@tanstack/react-devtools';
import '@tanstack/react-router-devtools';
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'axios';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import '@tanstack/react-query-devtools';

function Login() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_auth/login"
  });
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login(email, password);
      const redirectTo = search?.redirect || "/notes";
      navigate({
        to: redirectTo
      });
    } catch (error2) {
      console.error("login failed", error2);
      toast.error("login failed");
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };
  const handleGithubLogin = () => {
    window.location.href = "/api/auth/github";
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-50", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-5 sm:p-6 md:p-8 shadow-xl border border-slate-200 bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 sm:mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-slate-900", children: "Welcome Back" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-600 font-medium", children: "Sign in to your account" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm", children: error?.message || "" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-semibold mb-2 text-slate-700", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "you@example.com", required: true, className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-semibold text-slate-700", children: "Password" }),
          /* @__PURE__ */ jsx(Link, { to: "/forgot-password", className: "text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline", children: "Forgot Password?" })
        ] }),
        /* @__PURE__ */ jsx(Input, { id: "password", name: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true, className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
      ] }),
      /* @__PURE__ */ jsx(Button, { disabled: isLoading, type: "submit", className: "w-full bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold ", children: isLoading ? "Signing in . . ." : "Sign in" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "my-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-slate-200" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-600 font-medium", children: "OR" }),
      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-slate-200" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs(Button, { disabled: true, type: "button", variant: "outline", className: "w-full border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all", onClick: handleGoogleLogin, children: [
        /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
          /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
          /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
          /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
        ] }),
        "Continue with Google"
      ] }),
      /* @__PURE__ */ jsxs(Button, { disabled: true, type: "button", variant: "outline", className: "w-full border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all", onClick: handleGithubLogin, children: [
        /* @__PURE__ */ jsx(Github, { className: "mr-2 h-4 w-4" }),
        "Continue with GitHub"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-sm text-slate-700", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/signup", className: "font-semibold text-teal-600 hover:text-teal-700 hover:underline", children: "Sign up" })
    ] })
  ] }) });
}

export { Login as component };
//# sourceMappingURL=login-BmpL1fkn.mjs.map
