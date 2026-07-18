import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/*
  Account area shell — reuses the public header/footer.
  DEMO MODE: the sign-in guard lives in the client pages (they redirect to
  /login when no demo session exists). REAL: restore the server-side
  Supabase auth guard here — DEMO-MODE.md §2.
*/
export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div id="main-content" className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
