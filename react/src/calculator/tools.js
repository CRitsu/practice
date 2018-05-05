// tools


// remove the 0 from left hand of the string of number
export function removeLeftZero(str) {
  if (typeof str !== 'string') return str;
  let match = str.match(/(^0+)(?:\d)/);
  if (!match) return str;
  return str.replace(match[1], '');
}
