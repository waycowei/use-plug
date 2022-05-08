export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export function warn(message: string) {
  console.warn(`[use-plug] ${message}`)
}
