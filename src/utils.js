function deepClone(obj, clonesMap = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (clonesMap.has(obj)) {
    return clonesMap.get(obj);
  }

  if (Array.isArray(obj)) {
    const newArray = [];
    clonesMap.set(obj, newArray);
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = deepClone(obj[i], clonesMap);
    }
    return newArray;
  }

  const newObj = {};
  clonesMap.set(obj, newObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key], clonesMap);
    }
  }
  return newObj;
}

export function stringifyWithCircular(obj) {
  const seen = new WeakSet();

  function replacer(key, value) {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return deepClone(seen[value]);
      }

      seen.add(value);
    }

    return value;
  }

  return JSON.stringify(obj, replacer, 2);
}
