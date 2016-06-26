'use strict';

const generateLn = n => {
  return n !== undefined ?
    '.'.repeat(9).split('').map(() => n) :
      '.'.repeat(9).split('').map((_, i) => i + 1);
};

const generateArr = () => {
  return '.'.repeat(9).split('').map(() => {
    return '.'.repeat(9).split('').map(() => 0);
  });
};

const place = (arg, x, y, fn) => arr => {
  return arr.map((row, ri) => {
    return row.map((col, ci) => fn(row, ri, col, ci));
  });
};

const placeNo = (n, x, y, arr) => {
  return place(n, x, y, (row, ri, col, ci) => {
    return ri === y && ci === x ? n : col;
  })(arr);
};

const placeBox = (box, x, y, arr) => {
  return place(box, x, y, (row, ri, col, ci) => {
    return (ri >= y && ri < y + 3) && (ci >= x && ci < x + 3) ?
      box[ri - y][ci - x] : col;
  })(arr);
};

const placehLn = (line, x, y, arr) => {
  return place(line, x, y, (row, ri, col, ci) => {
    return ri === y && ci >= x && line[ci - x] !== undefined ?
      line[ci - x] : col;
  })(arr);
};

const placevLn = (line, x, y, arr) => {
  return place(line, x, y, (row, ri, col, ci) => {
    return ci === x && ri >= y && line[ri - y] !== undefined ?
      line[ri - y] : col;
  })(arr);
};

module.exports = {
  generateLn,
  generateArr,
  placeNo,
  placeBox,
  placehLn,
  placevLn
};

