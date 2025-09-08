"use client";

import React, { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import MainLayout from "./mainLayout";

type GlobalProviderProps = {
    children: ReactNode;
};

const queryClient = new QueryClient();

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
 
    return (
        <QueryClientProvider client={queryClient}>
           <MainLayout>{children}</MainLayout>
            <Toaster position="top-center" />
        </QueryClientProvider>
    );
};
