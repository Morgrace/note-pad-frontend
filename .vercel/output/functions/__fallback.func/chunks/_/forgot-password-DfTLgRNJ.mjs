import { jsx, jsxs } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Check, ArrowLeft, Mail } from 'lucide-react';
import { B as Button } from './router-BMu1Diwv.mjs';
import { I as Input } from './input-BRr6adUU.mjs';
import { C as Card } from './card-CNdZKGtC.mjs';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-query';
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

function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center p-4 bg-slate-50", children: /* @__PURE__ */ jsx(Card, { className: "w-full max-w-md p-8 shadow-xl border border-slate-200 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Check, { className: "h-8 w-8 text-teal-600" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-900 mb-3", children: "Check Your Email" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 mb-6", children: "We've sent password reset instructions to" }),
      /* @__PURE__ */ jsx("p", { className: "text-teal-600 font-semibold mb-8", children: email }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mb-8", children: "Click the link in the email to reset your password. If you don't see the email, check your spam folder." }),
      /* @__PURE__ */ jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxs(Button, { className: "w-full bg-teal-500 hover:bg-teal-600 shadow-lg text-white font-semibold", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Login"
      ] }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center p-4 bg-slate-50", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-8 shadow-xl border border-slate-200 bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "mb-4 text-slate-600 hover:text-slate-900 hover:bg-slate-100 -ml-2", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Login"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Mail, { className: "h-8 w-8 text-teal-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-slate-900 mb-3", children: "Forgot Password?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600", children: "No worries! Enter your email address and we'll send you instructions to reset your password." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-semibold mb-2 text-slate-700", children: "Email Address" }),
        /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "you@example.com", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-white font-semibold", children: [
        /* @__PURE__ */ jsx(Mail, { className: "mr-2 h-4 w-4" }),
        "Send Reset Instructions"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
      "Remember your password?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "font-semibold text-teal-600 hover:text-teal-700 hover:underline", children: "Sign in" })
    ] }) })
  ] }) });
}

export { ForgotPassword as component };
//# sourceMappingURL=forgot-password-DfTLgRNJ.mjs.map
