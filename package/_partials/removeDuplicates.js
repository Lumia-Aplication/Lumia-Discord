function removeDuplicates(arr) {
  const uniqueObj = [];
  const seenNames = {};
  
  for (const item of arr) {
    if (!seenNames[item.name]) {
      seenNames[item.name] = true;
      uniqueObj.push(item);
    }
  }
  
  return uniqueObj;
}

module.exports = removeDuplicates;