export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function tryCatch(promise) {
  try {
    return [await promise, null];
  } catch (e) {
    return [null, e];
  }
}

export const Window = {
  exists() {
    return typeof window !== "undefined" && typeof window === "object";
  },
  scrollToTop() {
    window.scrollTo(0, 0);
  },
  smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
};
