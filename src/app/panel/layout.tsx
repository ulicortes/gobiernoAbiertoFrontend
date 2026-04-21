"use client";

import { AuthProvider } from "@/components/providers/AuthProvider";
import PanelHeader from "@/components/layout/PanelHeader";
import PanelSidebar from "@/components/ui/PanelSidebar";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="w-full min-h-full flex flex-col overflow-x-hidden">
        <PanelHeader />
        <div className="w-full min-w-0 flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 shrink-0 p-4 md:p-6">
            <PanelSidebar />
          </div>
          <section className="flex-1 min-w-0 overflow-x-hidden bg-white p-4 md:p-6 min-h-[50vh]">
            {children}
          </section>
        </div>
      </div>
    </AuthProvider>
  );
}
