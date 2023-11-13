"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
function Create() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (router && pathname) {
      router.replace(pathname + `/style`);
    }
  }, [router, pathname]);
  return <></>;
}

export default Create;
