/* eslint-disable unicorn/filename-case */
/**
 * Exports a boolean value reporting whether the given API is supported or not
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isApiSupported = (api) => (typeof window !== "undefined" ? api in window : false);

export default isApiSupported;