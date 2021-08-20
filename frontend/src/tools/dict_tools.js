export function getCounterDictWithMoreKey(dict, key) {
  let copy = { ...dict };
  copy[key] ? copy[key]++ : (copy[key] = 1);
  return copy;
}
export function getCounterDictWithLessKey(dict, key) {
  let copy = { ...dict };
  copy[key]--;
  if (copy[key] <= 0) {
    delete copy[key];
  }
  return copy;
}

export function getDictOfDictsWithMoreDict(dict, key, value) {
  let copy = { ...dict };
  copy[key] = value;
  return copy;
}
