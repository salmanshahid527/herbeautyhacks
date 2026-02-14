import { AnnouncementBar } from "@/components/site/announcement-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

interface SiteShellProps {
  children: React.ReactNode;
}

export const SiteShell = ({ children }: SiteShellProps) => (
  <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
    <AnnouncementBar />
    <SiteHeader />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
);
