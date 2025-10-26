import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createRouter, createRootRouteWithContext, createFileRoute, lazyRouteComponent, redirect, HeadContent, Scripts, Link, useNavigate } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Search, Home, AlertCircle, RefreshCw, StickyNote, FileText, Pencil, Loader2, CheckCircle2, User, LogOut } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import axios from 'axios';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { create } from 'zustand';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

function getContext() {
  const queryClient = new QueryClient();
  return {
    queryClient
  };
}
function Provider({
  children,
  queryClient
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatAxiosError(error) {
  let status, message;
  if (axios.isAxiosError(error)) {
    status = error.response?.data?.err?.statusCode || 500;
    message = error.response?.data?.errorMessage || error.message;
  } else {
    message = error instanceof Error ? error.message : "An unknown error occured";
  }
  return { message, status };
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function ErrorPage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again later.",
  error,
  reset
}) {
  const handleRefresh = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl w-full text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "w-32 h-32 bg-red-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-16 w-16 text-red-600" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-32 h-32 bg-red-100 rounded-full animate-ping opacity-20" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-red-200 p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-6", children: message }),
      error && false,
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleRefresh,
            size: "lg",
            variant: "default",
            className: "shadow-md bg-red-600 hover:bg-red-700",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "mr-2 h-5 w-5" }),
              "Try Again"
            ]
          }
        ),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsx(Home, { className: "mr-2 h-5 w-5" }),
          "Go Home"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-white/80 backdrop-blur rounded-lg p-6 border border-gray-200", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Still having issues?" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 justify-center text-sm", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleRefresh,
            className: "text-blue-600 hover:underline",
            children: "Refresh the page"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "\u2022" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.history.back(),
            className: "text-blue-600 hover:underline",
            children: "Go back"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "\u2022" }),
        /* @__PURE__ */ jsx(Link, { to: "/notes", className: "text-blue-600 hover:underline", children: "View your notes" })
      ] })
    ] })
  ] }) });
}
const api = axios.create({
  baseURL: "https://notepad-backend-j8np.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
const BASE_URL$1 = "/users";
const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,
  async login(email, password) {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post(`${BASE_URL$1}/login`, { email, password });
      const user = response.data.data.user;
      set({ user, isLoading: false });
    } catch (error) {
      const { message, status } = formatAxiosError(error);
      set({ user: null, isLoading: false, error: { message, status } });
      throw error;
    }
  },
  async signup(firstName, lastName, email, password, passwordConfirm) {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post(`${BASE_URL$1}/signup`, {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm
      });
      const user = response.data.data.user;
      set({ user, isLoading: false });
    } catch (error) {
      const { message, status } = formatAxiosError(error);
      set({ user: null, isLoading: false, error: { message, status } });
      throw error;
    }
  },
  async verifyAuth() {
    try {
      set({ isLoading: true });
      const response = await api.get(`${BASE_URL$1}/me`);
      if (!response.data) throw new Error("Not authenticated");
      const user = response.data.data.user;
      set({ user, isLoading: false, error: null });
      return { success: true };
    } catch (error) {
      const { message } = formatAxiosError(error);
      console.error(message);
      set({ user: null, isLoading: false });
      return { success: false };
    }
  },
  async logout() {
    try {
      await api.post(`${BASE_URL$1}/logout`);
      set({ user: null, error: null });
    } catch (error) {
      const { message, status } = formatAxiosError(error);
      set({ user: null, error: { message, status } });
    }
  },
  clearError: () => set({ error: null })
}));
function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };
  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };
  return /* @__PURE__ */ jsx("nav", { className: "sticky top-0 z-50 backdrop-blur-md bg-slate-900 shadow-lg border-b border-slate-700", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: "flex items-center gap-2 sm:gap-3 group transition-transform hover:scale-105",
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-teal-500 p-1.5 sm:p-2 rounded-lg shadow-lg group-hover:bg-teal-600 transition-all", children: /* @__PURE__ */ jsx(StickyNote, { className: "h-5 w-5 sm:h-6 sm:w-6 text-white" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white", children: "Write-it-down" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 sm:gap-3", children: user ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowDropdown(!showDropdown),
          className: "flex items-center gap-2 sm:gap-3 bg-slate-800 hover:bg-slate-700 transition-all px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg group border border-slate-700",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg group-hover:scale-110 transition-transform", children: getInitials(user.firstName, user.lastName) }),
            /* @__PURE__ */ jsxs("span", { className: "text-white text-sm sm:text-base font-medium hidden sm:block", children: [
              user.firstName,
              " ",
              user.lastName
            ] }),
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: `w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform hidden sm:block ${showDropdown ? "rotate-180" : ""}`,
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M19 9l-7 7-7-7"
                  }
                )
              }
            )
          ]
        }
      ),
      showDropdown && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-10",
            onClick: () => setShowDropdown(false)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-2xl overflow-hidden z-20 border border-slate-700", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-slate-900 p-4 border-b border-slate-700", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg", children: getInitials(user.firstName, user.lastName) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-white font-semibold truncate", children: [
                user.firstName,
                " ",
                user.lastName
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm truncate", children: user.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/notes",
                className: "flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors group",
                onClick: () => setShowDropdown(false),
                children: [
                  /* @__PURE__ */ jsx(StickyNote, { className: "h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-200 font-medium", children: "My Notes" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/profile",
                className: "flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors group",
                onClick: () => setShowDropdown(false),
                children: [
                  /* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-200 font-medium", children: "Profile" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleLogout,
                className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { className: "h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-200 font-medium", children: "Logout" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          className: "text-white hover:bg-slate-800 shadow-lg font-medium border border-slate-700 text-xs sm:text-sm px-3 sm:px-4",
          children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          className: "bg-teal-500 text-white hover:bg-teal-600 shadow-lg font-medium hover:scale-105 transition-transform text-xs sm:text-sm px-3 sm:px-4",
          children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Sign Up" })
        }
      )
    ] }) })
  ] }) }) });
}
function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl w-full text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-9xl font-bold text-gray-200", children: "404" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx(Search, { className: "h-24 w-24 text-gray-400" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-gray-200 p-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Page Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-8", children: "Oops! The page you're looking for doesn't exist. It might have been moved or deleted." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "shadow-md", children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsx(Home, { className: "mr-2 h-5 w-5" }),
          "Go Home"
        ] }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxs(Link, { to: "/notes", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: "\u{1F4DD}" }),
          "View Notes"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 text-sm text-gray-600", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Looking for something specific?" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "hover:text-blue-600 hover:underline transition-colors",
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/notes",
            className: "hover:text-blue-600 hover:underline transition-colors",
            children: "All Notes"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/notes/new",
            className: "hover:text-blue-600 hover:underline transition-colors",
            children: "Create Note"
          }
        )
      ] })
    ] })
  ] }) });
}
const TanStackQueryDevtools = {
  name: "Tanstack Query",
  render: /* @__PURE__ */ jsx(ReactQueryDevtoolsPanel, {})
};
const appCss = "/assets/styles-vCAVUiPB.css";
function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingSteps] = useState([
    "Loading your workspace...",
    "Preparing markdown editor...",
    "Syncing your notes...",
    "Setting up shortcuts...",
    "Almost ready!"
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(stepTimer);
  }, [loadingSteps.length]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-700 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`,
      style: {
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-[10%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-10 animate-float", children: /* @__PURE__ */ jsx(StickyNote, { className: "w-full h-full text-teal-400" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-[15%] w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 opacity-10 animate-float-delayed", children: /* @__PURE__ */ jsx(FileText, { className: "w-full h-full text-teal-300" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 right-[20%] w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-10 animate-float", children: /* @__PURE__ */ jsx(Pencil, { className: "w-full h-full text-teal-500" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-16 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 sm:space-y-8 md:space-y-12 max-w-xs sm:max-w-sm md:max-w-md relative z-10 w-full px-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/50 border border-teal-400/30 transform hover:scale-105 transition-transform duration-300", children: [
              /* @__PURE__ */ jsx(StickyNote, { className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" }),
              /* @__PURE__ */ jsx("div", { className: "absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-lg animate-bounce-slow", children: /* @__PURE__ */ jsx(Pencil, { className: "w-4 h-4 sm:w-5 sm:h-5 text-teal-600" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-teal-400/30 animate-ping" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-2 rounded-2xl sm:rounded-3xl border border-teal-400/20 animate-pulse" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight animate-fade-in", children: "Write-it-down" }),
            /* @__PURE__ */ jsx("p", { className: "text-teal-300 text-sm sm:text-base md:text-lg font-medium animate-fade-in-delayed", children: "Professional Note-Taking for Developers" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-5 md:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full space-y-2 sm:space-y-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full bg-slate-700/50 rounded-full h-2 sm:h-2.5 md:h-3 backdrop-blur-sm border border-slate-600/30", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "bg-gradient-to-r from-teal-400 to-cyan-400 h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ease-out shadow-lg shadow-teal-400/50",
                  style: { width: `${progress}%` }
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-slate-400 text-xs sm:text-sm font-medium px-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  Math.round(progress),
                  "%"
                ] }),
                /* @__PURE__ */ jsx("span", { children: "Loading..." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-700/50 shadow-xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 sm:space-x-3 mb-2 sm:mb-3", children: [
                progress < 100 ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 sm:w-5 sm:h-5 text-teal-400 animate-spin" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-bounce" }),
                /* @__PURE__ */ jsx("span", { className: "text-white text-sm sm:text-base font-semibold", children: progress < 100 ? "Setting Up" : "Ready!" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-xs sm:text-sm text-center", children: loadingSteps[currentStep] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 sm:gap-3", children: [
              { name: "Editor", icon: Pencil },
              { name: "Storage", icon: FileText },
              { name: "Sync", icon: StickyNote }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: "bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300",
                  children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-1.5 sm:space-y-2", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 mx-auto rounded-full transition-all duration-500 ${currentStep > index ? "bg-green-400 shadow-lg shadow-green-400/50" : currentStep === index ? "bg-teal-400 animate-pulse shadow-lg shadow-teal-400/50" : "bg-slate-600"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5 mx-auto text-slate-400" }),
                    /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[10px] sm:text-xs font-medium block", children: feature.name })
                  ] })
                },
                feature.name
              );
            }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-slate-800/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-700/30", children: /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-[10px] sm:text-xs leading-relaxed", children: [
            "Capture your thoughts, code snippets, and ideas with our powerful markdown editor.",
            /* @__PURE__ */ jsx("span", { className: "block mt-1 text-teal-400 font-medium", children: "Write once, access anywhere." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("style", { children: `
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-5deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.2s forwards;
          opacity: 0;
        }
      ` })
      ]
    }
  );
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Write-it-down - Professional Note-Taking for Developers"
      },
      {
        name: "description",
        content: "A powerful markdown editor designed for professionals. Organize your thoughts, code snippets, and documentation with ease."
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  notFoundComponent: NotFound,
  errorComponent: ({ error, reset }) => /* @__PURE__ */ jsx(ErrorPage, { error, reset }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const verifyAuth = useAuthStore((state) => state.verifyAuth);
  useEffect(() => {
    verifyAuth();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3e3);
  }, []);
  if (showSplashScreen) {
    return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
      /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
      /* @__PURE__ */ jsxs("body", { children: [
        /* @__PURE__ */ jsx(SplashScreen, {}),
        /* @__PURE__ */ jsx(Scripts, {})
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      children,
      /* @__PURE__ */ jsx(Toaster, {}),
      /* @__PURE__ */ jsx(
        TanStackDevtools,
        {
          config: {
            position: "bottom-left"
          },
          plugins: [
            {
              name: "Tanstack Router",
              render: /* @__PURE__ */ jsx(TanStackRouterDevtoolsPanel, {})
            },
            TanStackQueryDevtools
          ]
        }
      ),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$9 = () => import('./profile-BGxHMa2A.mjs');
const Route$9 = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import('./_authenticated-BFsOu0JM.mjs');
const Route$8 = createFileRoute("/_authenticated")({
  beforeLoad: ({
    context,
    location
  }) => {
    const {
      user
    } = useAuthStore.getState();
    if (user === null) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import('./_auth-C4EHuMCE.mjs');
const Route$7 = createFileRoute("/_auth")({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (user) {
      throw redirect({
        to: "/"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import('./index-3LFgwiCs.mjs');
const Route$6 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import('./signup-CQEB33n9.mjs');
const Route$5 = createFileRoute("/_auth/signup")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import('./login-BmpL1fkn.mjs');
const Route$4 = createFileRoute("/_auth/login")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import('./forgot-password-DfTLgRNJ.mjs');
const Route$3 = createFileRoute("/_auth/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import('./index-kE9huDEI.mjs');
const Route$2 = createFileRoute("/_authenticated/notes/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const BASE_URL = "/notes";
const USER_URL = "/users/me/notes";
async function getNotes() {
  try {
    const response = await api.get(`${USER_URL}`);
    return response.data;
  } catch (error) {
    const { message } = formatAxiosError(error);
    throw new Error(message);
  }
}
async function getNote(id) {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    const { message } = formatAxiosError(error);
    throw new Error(message);
  }
}
async function createNote(noteData) {
  try {
    const response = await api.post(`${USER_URL}`, noteData);
    return response.data;
  } catch (error) {
    const { message } = formatAxiosError(error);
    throw new Error(message);
  }
}
async function updateNote(id, noteData) {
  try {
    const response = await api.patch(`${BASE_URL}/${id}`, noteData);
    return response.data;
  } catch (error) {
    const { message } = formatAxiosError(error);
    throw new Error(message);
  }
}
async function deleteNote(id) {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    const { message } = formatAxiosError(error);
    throw new Error(message);
  }
}
const $$splitComponentImporter$1 = () => import('./_id-DOGANQtW.mjs');
const Route$1 = createFileRoute("/_authenticated/notes/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  loader: async ({
    params
  }) => await getNote(params.id)
});
const $$splitComponentImporter = () => import('./index-Au7FG2_B.mjs');
const Route = createFileRoute("/_authenticated/notes/new/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ProfileRoute = Route$9.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$a
});
const AuthenticatedRoute = Route$8.update({
  id: "/_authenticated",
  getParentRoute: () => Route$a
});
const AuthRoute = Route$7.update({
  id: "/_auth",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const AuthSignupRoute = Route$5.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => AuthRoute
});
const AuthLoginRoute = Route$4.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AuthRoute
});
const AuthForgotPasswordRoute = Route$3.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => AuthRoute
});
const AuthenticatedNotesIndexRoute = Route$2.update({
  id: "/notes/",
  path: "/notes/",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedNotesIdRoute = Route$1.update({
  id: "/notes/$id",
  path: "/notes/$id",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedNotesNewIndexRoute = Route.update({
  id: "/notes/new/",
  path: "/notes/new/",
  getParentRoute: () => AuthenticatedRoute
});
const AuthRouteChildren = {
  AuthForgotPasswordRoute,
  AuthLoginRoute,
  AuthSignupRoute
};
const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
const AuthenticatedRouteChildren = {
  AuthenticatedNotesIdRoute,
  AuthenticatedNotesIndexRoute,
  AuthenticatedNotesNewIndexRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  ProfileRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const rqContext = getContext();
  const router2 = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props) => {
      return /* @__PURE__ */ jsx(Provider, { ...rqContext, children: props.children });
    }
  });
  setupRouterSsrQueryIntegration({ router: router2, queryClient: rqContext.queryClient });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));

export { Button as B, updateNote as a, createNote as b, cn as c, deleteNote as d, getNotes as g, router as r, useAuthStore as u };
//# sourceMappingURL=router-BMu1Diwv.mjs.map
