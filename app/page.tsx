// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthed } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("User is", isAuthed() ? "authenticated" : "not authenticated");
    router.replace(isAuthed() ? "/goals" : "/login");
  }, [router]);

  return null;
}
