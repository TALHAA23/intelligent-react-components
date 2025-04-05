export default function getAllKeys(
  obj: Record<string, any>,
  prefix: string = ""
): string[] {
  const keys: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const currentKey = prefix ? `${prefix}.${key}` : key;
      keys.push(currentKey);

      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys.push(...getAllKeys(obj[key], currentKey));
      }
    }
  }

  return keys;
}
