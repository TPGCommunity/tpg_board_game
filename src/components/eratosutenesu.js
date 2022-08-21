const max = 240000
const r = Math.sqrt(max)

var boolList = new Array(max).fill(true);

var p = 2
while (p <= r) {
  //console.log("p="+p)
  boolList[p] = true
  var q = p + p
  while (q <= max) {
    //console.log(q)
    boolList[q] = false
    q = q + p
  }
  var next = p + 1
  while (!boolList[next]) {
    next += 1
  }
  p = next
}

boolList[0] = false
boolList[1] = false
export const primeBool = boolList
console.log(primeBool)