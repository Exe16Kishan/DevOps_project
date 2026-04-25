"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getPageLabel(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/auth/signin")) return "signin";
  if (pathname.startsWith("/auth/signup")) return "signup";
  if (pathname.startsWith("/cart")) return "cart";
  if (pathname.startsWith("/product")) return "product";
  if (pathname.startsWith("/checkout")) return "checkout";
  return "unknown";
}

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    // fires on every client-side navigation, not just initial load
    fetch(`/api/track?type=${encodeURIComponent(getPageLabel(pathname))}`).catch(() => {});
  }, [pathname]);

  return null;
}