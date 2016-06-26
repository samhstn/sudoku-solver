'use strict';

const transpose = arr => arr[0].map((_, i) => arr.map(row => row[i]));

const boxesToRows = arr => arr.map((row, ri) => row.map((_, ci) => {
  return arr[Math.floor(ci / 3) + 3 * Math.floor(ri / 3)][(ci % 3) + 3 * (ri % 3)];
}));

const completeLn = row => row.map(col => {
  return col ? col : [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(el => row.indexOf(el) === -1)[0];
});

const completeRows = arr => arr.map(row => {
  return (row.filter(el => el === 0)).length === 1 ? completeLn(row) : row;
});

const completeCols = arr => transpose(completeRows(transpose(arr)));

const completeBoxs = arr => boxesToRows(completeRows(boxesToRows(arr)));

const replaceZerosWithNos = arr => arr.map((row, ri) => row.map((col, ci) => {
  return arr[ri][ci] ? col : [1, 2, 3, 4, 5, 6, 7, 8, 9];
}));

const solveRow = arr => arr.map(row => row.map(col => {
  return typeof col === 'object' ? col.filter(el => row.indexOf(el) === -1) : col;
}));

const replaceArrs = arr => arr.map(row => row.map(col => {
  return typeof col === 'object' && col.length === 1 ? col[0] : col;
}));

const solveCol = arr => transpose(solveRow(transpose(arr)));

const solveBox = arr => boxesToRows(solveRow(boxesToRows(arr)));

const addArr = (arr, acc) => arr.length ? acc.indexOf(arr[0]) === -1 ?
    addArr(arr.slice(1, arr.length), [arr[0]].concat(acc)) :
      addArr(arr.slice(1, arr.length), acc) : acc.sort();

const flattenLn = (ln, acc) => {
  return ln.length ? flattenLn(ln.slice(1, ln.length), addArr(ln[0], acc)) : acc;
};

const solveUniqueLn = row => {
  return row.map((el, i) => {
    return typeof el === 'object' ? el.reduce((prev, curr) => {
      const thinedArr = row.map((e, ii) => typeof e === 'object' && i !== ii ? e : []);
      return flattenLn(thinedArr, []).indexOf(curr) === -1 ?  prev.concat(curr) : prev;
    }, []) : el;
  }).map((el, i) => typeof el === 'object' && el.length === 1 ? el : row[i]);
};

const solveUniqueRows = arr => arr.map(row => solveUniqueLn(row));

const solveUniqueCols = arr => transpose(solveUniqueRows(transpose(arr)));

const solveUniqueBoxs = arr => boxesToRows(solveUniqueRows(boxesToRows(arr)));

module.exports = {
  transpose,
  boxesToRows,
  completeLn,
  completeRows,
  completeCols,
  completeBoxs,
  replaceZerosWithNos,
  replaceArrs,
  solveRow,
  solveCol,
  solveBox,
  addArr,
  flattenLn,
  solveUniqueLn,
  solveUniqueRows,
  solveUniqueCols,
  solveUniqueBoxs
};
