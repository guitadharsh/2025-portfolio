"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface RestrictedWrapperProps {
  restrictedKeys?: string[];
  children: ReactNode;
}

const RestrictedWrapper = ({ restrictedKeys = [], children }: RestrictedWrapperProps) => {
  const pathname = usePathname();

  const isRestricted = restrictedKeys.some((key) =>
    pathname?.includes(`/${key}`)
  );

  if (isRestricted) {
    return null;
  }

  return <>{children}</>;
};

export default RestrictedWrapper;
