function removeItemFromArray(arr, keyToRemove) {
  return arr.filter(item => !(keyToRemove in item));
}

module.exports = removeItemFromArray;