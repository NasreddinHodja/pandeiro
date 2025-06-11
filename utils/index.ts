export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 100
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
};
