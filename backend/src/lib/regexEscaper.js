/**
 * Method for escaping RegExp special characters in a given string.
 * 
 * @param {string} str The string to escape special reg-exp characters in.
 * @returns escaped string
 * 
 * @see https://stackoverflow.com/a/9310752
 */
export default function escapeRegExChars(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
