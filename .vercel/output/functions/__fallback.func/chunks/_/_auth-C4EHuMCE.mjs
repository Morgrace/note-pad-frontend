import { jsx } from 'react/jsx-runtime';
import { useNavigate, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { u as useAuthStore } from './router-BMu1Diwv.mjs';
import '@tanstack/react-router-ssr-query';
import '@tanstack/react-query';
import '@tanstack/react-devtools';
import '@tanstack/react-router-devtools';
import 'sonner';
import 'lucide-react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'axios';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import '@tanstack/react-query-devtools';

function AuthLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  useEffect(() => {
    if (!user) return;
    navigate({
      to: "/",
      replace: true
    });
  }, [isLoading, user]);
  return /* @__PURE__ */ jsx("div", { className: "animate-fade-in", children: /* @__PURE__ */ jsx(Outlet, {}) });
}

export { AuthLayout as component };
//# sourceMappingURL=_auth-C4EHuMCE.mjs.map
