"use client";

import { useEffect, useState } from "react";
import AdUnit from "@/components/AdUnit";

export function ResponsiveHeaderAd() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (isMobile === null) return null;

  return isMobile ? <AdUnit type="mobile" /> : <AdUnit type="leader" />;
}
