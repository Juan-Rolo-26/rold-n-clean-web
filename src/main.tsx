import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __zoomLockInstalled?: boolean;
  }
}

if (typeof window !== "undefined" && !window.__zoomLockInstalled) {
  const preventZoomKeys = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && ["+", "-", "=", "0"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const preventZoomWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
    }
  };

  const preventGesture = (event: Event) => {
    event.preventDefault();
  };

  window.addEventListener("keydown", preventZoomKeys, { passive: false });
  window.addEventListener("wheel", preventZoomWheel, { passive: false });
  window.addEventListener("gesturestart", preventGesture, { passive: false });
  window.addEventListener("gesturechange", preventGesture, { passive: false });
  window.addEventListener("gestureend", preventGesture, { passive: false });

  window.__zoomLockInstalled = true;
}

createRoot(document.getElementById("root")!).render(<App />);
