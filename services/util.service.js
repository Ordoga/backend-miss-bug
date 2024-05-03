import fs from "fs"

export const utilService = {
  sortingByTitleComparator,
  makeId,
  readJsonFile,
}

function sortingByTitleComparator(sortDir){
  if (sortDir === -1){
    return sortByTitleDescending
  }else{
    return sortByTitleAscending
  }
}

function sortByTitleAscending(a, b) {
  if (a.title < b.title) {
    return -1
  } else {
    return 1
  }
}

function sortByTitleDescending(a, b) {
  return sortByTitleAscending(b, a)
}

function makeId(length = 6) {
  var txt = ""
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function readJsonFile(path) {
  const str = fs.readFileSync(path, "utf8")
  const json = JSON.parse(str)
  return json
}
