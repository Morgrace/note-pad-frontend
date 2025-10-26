import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Camera, User, Calendar, Save, Lock } from 'lucide-react';
import { u as useAuthStore, B as Button } from './router-BMu1Diwv.mjs';
import { I as Input } from './input-BRr6adUU.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from './card-CNdZKGtC.mjs';
import '@tanstack/react-router';
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

function Profile() {
  const user = useAuthStore((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Update profile");
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log("Update password");
  };
  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-50 p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-slate-900", children: "Profile Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 mt-2 text-lg", children: "Manage your account information and preferences" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "shadow-lg border border-slate-200", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-slate-900", children: [
          /* @__PURE__ */ jsx(Camera, { className: "h-5 w-5 text-teal-600" }),
          "Profile Picture"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            profileImage ? /* @__PURE__ */ jsx("img", { src: profileImage, alt: "Profile", className: "w-32 h-32 rounded-full object-cover border-4 border-teal-100" }) : /* @__PURE__ */ jsx("div", { className: "w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-teal-100", children: getInitials() }),
            /* @__PURE__ */ jsxs("label", { htmlFor: "profile-upload", className: "absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all hover:scale-110", children: [
              /* @__PURE__ */ jsx(Camera, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("input", { id: "profile-upload", type: "file", accept: "image/*", className: "hidden", onChange: handleImageUpload })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900 mb-1", children: "Change Profile Picture" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mb-3", children: "Upload a new profile picture. Recommended size: 400x400px" }),
            /* @__PURE__ */ jsx("label", { htmlFor: "profile-upload", children: /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "border-slate-300 hover:bg-slate-50", onClick: () => document.getElementById("profile-upload")?.click(), children: [
              /* @__PURE__ */ jsx(Camera, { className: "mr-2 h-4 w-4" }),
              "Upload Photo"
            ] }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "shadow-lg border border-slate-200", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-slate-900", children: [
          /* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-teal-600" }),
          "Personal Information"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "firstName", className: "block text-sm font-semibold mb-2 text-slate-700", children: "First Name" }),
              /* @__PURE__ */ jsx(Input, { id: "firstName", name: "firstName", type: "text", defaultValue: user?.firstName, placeholder: "John", className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "lastName", className: "block text-sm font-semibold mb-2 text-slate-700", children: "Last Name" }),
              /* @__PURE__ */ jsx(Input, { id: "lastName", name: "lastName", type: "text", defaultValue: user?.lastName, placeholder: "Doe", className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "block text-sm font-semibold mb-2 text-slate-700", children: [
              "Email Address",
              /* @__PURE__ */ jsx("span", { className: "text-slate-500 font-normal ml-2", children: "(Cannot be changed)" })
            ] }),
            /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", defaultValue: user?.email, disabled: true, className: "border-slate-300 bg-slate-100 cursor-not-allowed" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "dateOfBirth", className: "block text-sm font-semibold mb-2 text-slate-700", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "inline h-4 w-4 mr-1" }),
              "Date of Birth"
            ] }),
            /* @__PURE__ */ jsx(Input, { id: "dateOfBirth", name: "dateOfBirth", type: "date", className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(Button, { type: "submit", className: "bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all", children: [
            /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
            "Save Changes"
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "shadow-lg border border-slate-200", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-slate-900", children: [
          /* @__PURE__ */ jsx(Lock, { className: "h-5 w-5 text-teal-600" }),
          "Change Password"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleUpdatePassword, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "currentPassword", className: "block text-sm font-semibold mb-2 text-slate-700", children: "Current Password" }),
            /* @__PURE__ */ jsx(Input, { id: "currentPassword", name: "currentPassword", type: "password", placeholder: "Enter current password", className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "newPassword", className: "block text-sm font-semibold mb-2 text-slate-700", children: "New Password" }),
            /* @__PURE__ */ jsx(Input, { id: "newPassword", name: "newPassword", type: "password", placeholder: "Enter new password", minLength: 8, className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Must be at least 8 characters long" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-semibold mb-2 text-slate-700", children: "Confirm New Password" }),
            /* @__PURE__ */ jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "Confirm new password", minLength: 8, className: "border-slate-300 focus:border-teal-500 focus:ring-teal-500" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(Button, { type: "submit", className: "bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all", children: [
            /* @__PURE__ */ jsx(Lock, { className: "mr-2 h-4 w-4" }),
            "Update Password"
          ] }) })
        ] }) })
      ] })
    ] })
  ] }) });
}

export { Profile as component };
//# sourceMappingURL=profile-BGxHMa2A.mjs.map
