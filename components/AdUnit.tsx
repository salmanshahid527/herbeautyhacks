"use client";

import { useEffect, useRef } from "react";

type AdType = "native" | "social-bar" | "medium" | "leader" | "mobile";

const BANNER_CONFIG: Record<string, { key?: string; width: number; height: number }> = {
  medium: { key: process.env.NEXT_PUBLIC_ADSTERRA_MEDIUM_KEY, width: 300, height: 250 },
  leader: { key: process.env.NEXT_PUBLIC_ADSTERRA_LEADER_KEY, width: 728, height: 90 },
  mobile: { key: process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_KEY, width: 320, height: 50 },
};

function shouldLoadAds(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true"
  );
}

export default function AdUnit({ type }: { type: AdType }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldLoadAds() || !ref.current) return;
    ref.current.innerHTML = "";

    if (type === "native") {
      const key = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY;
      if (!key) return;
      const div = document.createElement("div");
      div.id = `container-${key}`;
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `https://pl29775347.effectivecpmnetwork.com/${key}/invoke.js`;
      ref.current.append(div, script);
      return; 
    }

    if (type === "social-bar") {
      const key = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_KEY;
      if (!key) return;
      const script = document.createElement("script");
      script.src = `https://pl29775357.effectivecpmnetwork.com/${key}.js`;
      document.body.appendChild(script);
      return () => {
        script.parentNode?.removeChild(script);
      };
    }

    const cfg = BANNER_CONFIG[type];
    if (!cfg?.key) return;
    const optionsScript = document.createElement("script");
    optionsScript.innerHTML = `atOptions = { 'key':'${cfg.key}', 'format':'iframe', 'height':${cfg.height}, 'width':${cfg.width}, 'params':{} };`;
    const invokeScript = document.createElement("script");
    invokeScript.src = `https://www.highperformanceformat.com/${cfg.key}/invoke.js`;
    ref.current.append(optionsScript, invokeScript);
  }, [type]);

  if (!shouldLoadAds()) return null;
  return <div ref={ref} />;
}