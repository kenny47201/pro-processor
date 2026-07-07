import { useEffect, useState } from "react";
import { Download, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneDisplay() {
  return window.matchMedia?.("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function InstallProcessToolsButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    setInstalled(isStandaloneDisplay());

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setInstallPrompt(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
        {online ? <Wifi className="h-3.5 w-3.5 text-primary" /> : <WifiOff className="h-3.5 w-3.5 text-destructive" />}
        {online ? "Online" : "Offline ready"}
      </div>

      {installed ? (
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          Installed
        </div>
      ) : installPrompt ? (
        <Button size="sm" onClick={handleInstall} className="gap-2">
          <Download className="h-4 w-4" />
          Install app
        </Button>
      ) : (
        <div className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
          Use browser menu to install
        </div>
      )}
    </div>
  );
}
