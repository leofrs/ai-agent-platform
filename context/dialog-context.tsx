"use client";
import { IDialogSearchProps } from "@/components/dialog-search";
import { createContext, useContext } from "react";

export const DialogContext = createContext<IDialogSearchProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useDialog = () => useContext(DialogContext);
