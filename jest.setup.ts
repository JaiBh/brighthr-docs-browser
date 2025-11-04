// jest.setup.ts
import "@testing-library/jest-dom";

// 1) ResizeObserver (used by shadcn/ui ScrollArea etc.)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver =
  (global as any).ResizeObserver || ResizeObserver;

// 2) scrollIntoView (often called in focus/scroll areas)
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = function () {};
}

// 3) matchMedia (some libs check this)
if (!window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as any;
  };
}
