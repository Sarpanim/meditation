"use client";
import supabase from "@/lib/supabase-browser";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        window.location.assign("/login");
      }}
      className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium bg-muted hover:bg-muted/70"
    >
      Se déconnecter
    </button>
  );
}
