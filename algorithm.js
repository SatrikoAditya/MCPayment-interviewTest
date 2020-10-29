function twoSums(arr, target) {
  for(let i = 0; i < arr.length; i++) {
    let num = target - arr[i]
    for(let j = 0; j < arr.length; j++) {
      if(arr[j] === num && i !== j) {
        return [i, j]
      }
    }
  }
}

console.log(twoSums([2,7,11,15], 13))
console.log(twoSums([3, 2, 4], 6))
console.log(twoSums([3, 3], 6))