'use client';

import React, { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import MainLayout from "./mainLayout";
import { usePathname } from "next/navigation";

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {!isLoginPage ? <MainLayout>{children}</MainLayout> : children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
};
