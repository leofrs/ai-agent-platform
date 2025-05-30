"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DialogProvider } from "@/context/dialog-provider";
import { DialogSearch } from "@/components/dialog-search";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DialogProvider isOpen={isOpen} setIsOpen={setIsOpen}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 ">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>

            <div className="mr-6">
              <Button
                className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Pesquisar
                <span className="h-6 ml-auto pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <SearchIcon size="4" />
                </span>
              </Button>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 pt-0 ">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </DialogProvider>
  );
}
