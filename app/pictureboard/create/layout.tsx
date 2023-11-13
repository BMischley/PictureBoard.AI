"use client";
import { SubmissionContextProvider } from "@/components/submission/SubmissionContext";
import SubmissionLayout from "@/components/submission/SubmissionLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { useState } from "react";
import AuthProtect from "@/components/auth/AuthProtect";
import getQueryClient from "@/app/getQueryClient";
export const dynamic = "force-dynamic";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: any;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydrate(queryClient)}>
        <AuthProtect>
          <SubmissionContextProvider params={params}>
            <SubmissionLayout>{children}</SubmissionLayout>
          </SubmissionContextProvider>
        </AuthProtect>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default Layout;
