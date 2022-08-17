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
