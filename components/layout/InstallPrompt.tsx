"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (localStorage.getItem("pwa-install-dismissed")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  return (
    <div className="fixed bottom-5 left-5 right-5 z-50 max-w-md mx-auto bg-[var(--color-white)] border border-[var(--color-border)] rounded-lg p-5 animate-fade-in-up shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-[var(--color-ink)]">
            Install App
          </p>
          <p className="text-[11px] text-[var(--color-muted)] mt-1 font-light">
            Add to home screen for the best experience.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDismiss}
            className="text-[11px] text-[var(--color-muted)] hover:text-[var(--color-ink)] px-2 py-1.5 transition-colors"
          >
            Later
          </button>
          <button
            onClick={handleInstall}
            className="text-[11px] font-semibold bg-[var(--color-ink)] text-white px-5 py-1.5 hover:opacity-90 transition-opacity"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
