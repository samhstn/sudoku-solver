'use strict';

const tape = require('tape');

const helpers = require('./helpers/index.js');

const transpose = require('./index.js').transpose;
const boxesToRows = require('./index.js').boxesToRows;
const completeLn = require('./index.js').completeLn;
const completeRows = require('./index.js').completeRows;
const completeCols = require('./index.js').completeCols;
const completeBoxs = require('./index.js').completeBoxs;
const replaceZerosWithNos = require('./index.js').replaceZerosWithNos;
const replaceArrs = require('./index.js').replaceArrs;
const solveRow = require('./index.js').solveRow;
const solveCol = require('./index.js').solveCol;
const solveBox = require('./index.js').solveBox;
const addArr = require('./index.js').addArr;
const flattenLn = require('./index.js').flattenLn;
const solveUniqueLn = require('./index.js').solveUniqueLn;
const solveUniqueRows = require('./index.js').solveUniqueRows;
const solveUniqueCols = require('./index.js').solveUniqueCols;
const solveUniqueBoxs = require('./index.js').solveUniqueBoxs;

let actual;
let expected;
let input;

tape('transposes an array of arrays', t => {
  input = helpers.generateArr().map(() => helpers.generateLn());
  actual = transpose(input);
  expected = helpers.generateArr().map((_, n) => helpers.generateLn(n + 1));
  t.deepEqual(actual, expected, 'transposes arrs of 1 to 9');

  input = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 5, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0]
  ];
  actual = transpose(input);
  expected = [
    [1, 2, 3, 0, 0, 0, 7, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  t.deepEqual(actual, expected, 'transposes random array');
  t.end();
});

tape('translates boxes to rows', t => {
  input = [
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, 4, 5, 6],
    [7, 8, 9, 7, 8, 9, 7, 8, 9],
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, 4, 5, 6],
    [7, 8, 9, 7, 8, 9, 7, 8, 9],
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, 4, 5, 6],
    [7, 8, 9, 7, 8, 9, 7, 8, 9]
  ];
  actual = boxesToRows(input);
  expected = helpers.generateArr().map(() => helpers.generateLn());
  t.deepEqual(actual, expected, 'maps boxes of consecutive numbers');

  input = [
    [3, 7, 6, 4, 8, 9, 1, 2, 0],
    [0, 0, 0, 1, 2, 3, 8, 0, 0],
    [0, 8, 9, 7, 8, 9, 0, 8, 0],
    [0, 0, 0, 1, 2, 3, 0, 0, 0],
    [0, 5, 0, 4, 5, 6, 0, 0, 0],
    [0, 0, 9, 7, 8, 9, 0, 0, 0],
    [0, 0, 2, 1, 0, 0, 1, 0, 3],
    [4, 0, 0, 4, 5, 0, 4, 0, 4],
    [9, 8, 0, 0, 0, 0, 0, 0, 1]
  ];
  actual = boxesToRows(input);
  expected = [
    [3, 7, 6, 0, 0, 0, 0, 8, 9],
    [4, 8, 9, 1, 2, 3, 7, 8, 9],
    [1, 2, 0, 8, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 4, 0, 0, 9, 8, 0],
    [1, 0, 0, 4, 5, 0, 0, 0, 0],
    [1, 0, 3, 4, 0, 4, 0, 0, 1]
  ];
  t.deepEqual(actual, expected, 'maps boxes random numbers');

  t.end();
});

tape('completes lines', t => {
  actual = completeLn([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  expected = helpers.generateLn();
  t.deepEqual(actual, expected, 'completes number 9 at the end of a line');
  actual = completeLn([1, 0, 3, 4, 5, 6, 7, 8, 9]);
  expected = helpers.generateLn();
  t.deepEqual(actual, expected, 'completes number 2 in a line');
  actual = completeLn([3, 7, 5, 4, 0, 6, 1, 8, 9]);
  expected = [3, 7, 5, 4, 2, 6, 1, 8, 9];
  t.deepEqual(actual, expected, 'completes number 2 in a random line');
  t.end();
});

tape('completes a row with one number to fill in', t => {
  input = helpers.placehLn(helpers.generateLn(), 0, 0, helpers.generateArr());
  actual = completeRows(input);
  expected = helpers.placeNo(9, 8, 0, input);
  t.deepEqual(actual, expected, 'completes top row');

  input = helpers.placehLn(helpers.generateLn(), 0, 2, helpers.generateArr());
  actual = completeRows(input);
  expected = helpers.placeNo(3, 2, 2, input);
  t.deepEqual(actual, expected, 'completes row on second line');

  t.end();
});

tape('completes a column with one number to fill in', t => {
  input = helpers.placevLn([1, 2, 3, 4, 5, 6, 7, 8, 0], 0, 0, helpers.generateArr());
  actual = completeCols(input);
  expected = helpers.placeNo(9, 0, 8, input);
  t.deepEqual(actual, expected, 'completes first column');

  input = helpers.placevLn([1, 2, 3, 4, 5, 6, 7, 8, 0], 2, 0, helpers.generateArr());
  actual = completeCols(input);
  expected = helpers.placeNo(9, 2, 8, input);
  t.deepEqual(actual, expected, 'completes third column');

  t.end();
});

tape('completes a box with one number to fill in', t => {
  input = helpers.placeBox([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 0, 0, helpers.generateArr());
  actual = completeBoxs(input);
  expected = helpers.placeNo(9, 2, 2, input);
  t.deepEqual(actual, expected, 'completes top left box');

  input = helpers.placeBox([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 3, 3, helpers.generateArr());
  actual = completeBoxs(input);
  expected = helpers.placeNo(9, 5, 5, input);
  t.deepEqual(actual, expected, 'completes middle box');

  input = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 4, 2, 0, 0, 0, 0, 0, 0],
    [9, 0, 8, 0, 0, 0, 0, 0, 0],
    [3, 6, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  actual = completeBoxs(input);
  expected = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 4, 2, 0, 0, 0, 0, 0, 0],
    [9, 7, 8, 0, 0, 0, 0, 0, 0],
    [3, 6, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  t.deepEqual(actual, expected, 'completes random box');

  t.end();
});

tape('replaces 0s with Nos', t => {
  input = helpers.placeNo(3, 0, 2, helpers.placeNo(1, 0, 0, helpers.generateArr()));
  actual = replaceZerosWithNos(input);
  const l = helpers.generateLn();
  expected = [
    [1, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [3, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l]
  ];
  t.deepEqual(actual, expected, 'creates arrays of numbers 1 to 9 in place of 0');
  t.end();
});

tape('solveRow reduces it\'s array for the numbers in it\'s row', t => {
  const l = helpers.generateLn();
  const lTake1 = l.slice(1, 9);
  const lTake5 = l.slice(0, 4).concat(l.slice(5, 9));
  input = [
    [1, 2, 3, 4, 5, 6, 7, 8, l],
    [2, 3, 4, 5, 6, 7, l, l, l],
    [l, l, 1, 2, 3, 4, 5, 6, 7],
    [l, l, l, l, l, l, l, l, 1],
    [l, l, l, 5, l, l, l, l, l],
    [l, l, l, 5, l, l, l, l, l],
    [1, l, 2, l, 3, l, 4, l, 5],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l]
  ];
  actual = solveRow(input);
  expected = [
    [1, 2, 3, 4, 5, 6, 7, 8, [9]],
    [2, 3, 4, 5, 6, 7, [1, 8, 9], [1, 8, 9], [1, 8, 9]],
    [[8, 9], [8, 9], 1, 2, 3, 4, 5, 6, 7],
    [lTake1, lTake1, lTake1, lTake1, lTake1, lTake1, lTake1, lTake1, 1],
    [lTake5, lTake5, lTake5, 5, lTake5, lTake5, lTake5, lTake5, lTake5],
    [lTake5, lTake5, lTake5, 5, lTake5, lTake5, lTake5, lTake5, lTake5],
    [1, [6, 7, 8, 9], 2, [6, 7, 8, 9], 3, [6, 7, 8, 9], 4, [6, 7, 8, 9], 5],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l]
  ];
  t.deepEqual(actual, expected, 'solves the rows');
  t.end();
});

tape('solveCol reduces it\'s array for the numbers in it\'s column', t => {
  const l = helpers.generateLn();
  const lTake1 = l.slice(1, 9);
  const lTake5 = l.slice(0, 4).concat(l.slice(5, 9));
  input = [
    [1, 2, l, l, l, l, 1, l, l],
    [2, 3, l, l, l, l, l, l, l],
    [3, 4, 1, l, l, l, 2, l, l],
    [4, 5, 2, l, 5, 5, l, l, l],
    [5, 6, 3, l, l, l, 3, l, l],
    [6, 7, 4, l, l, l, l, l, l],
    [7, l, 5, l, l, l, 4, l, l],
    [8, l, 6, l, l, l, l, l, l],
    [l, l, 7, 1, l, l, 5, l, l]
  ];
  actual = solveCol(input);
  expected = [
    [1, 2, [8, 9], lTake1, lTake5, lTake5, 1, l, l],
    [2, 3, [8, 9], lTake1, lTake5, lTake5, [6, 7, 8, 9], l, l],
    [3, 4, 1, lTake1, lTake5, lTake5, 2, l, l],
    [4, 5, 2, lTake1, 5, 5, [6, 7, 8, 9], l, l],
    [5, 6, 3, lTake1, lTake5, lTake5, 3, l, l],
    [6, 7, 4, lTake1, lTake5, lTake5, [6, 7, 8, 9], l, l],
    [7, [1, 8, 9], 5, lTake1, lTake5, lTake5, 4, l, l],
    [8, [1, 8, 9], 6, lTake1, lTake5, lTake5, [6, 7, 8, 9], l, l],
    [[9], [1, 8, 9], 7, 1, lTake5, lTake5, 5, l, l]
  ];
  t.deepEqual(actual, expected, 'solves the rows');
  t.end();
});

tape('solveBox reduces it\'s array for the numbers in it\'s box', t => {
  const l = helpers.generateLn();
  input = [
    [1, 2, 3, l, l, l, 7, 8, 9],
    [l, l, l, 1, 2, 3, l, l, 5],
    [l, l, l, 4, 5, l, 1, 2, l],
    [l, l, l, l, l, l, 1, l, l],
    [l, l, l, l, l, l, l, l, l],
    [l, l, l, l, l, l, l, l, l],
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, l, 5, 6],
    [7, 8, l, 7, l, 9, 7, 8, 9]
  ];
  actual = solveBox(input);
  expected = [
    [1, 2, 3, [6, 7, 8, 9], [6, 7, 8, 9], [6, 7, 8, 9], 7, 8, 9],
    [l.slice(3, 9), l.slice(3, 9), l.slice(3, 9), 1, 2, 3, [3, 4, 6], [3, 4, 6], 5],
    [l.slice(3, 9), l.slice(3, 9), l.slice(3, 9), 4, 5, [6, 7, 8, 9], 1, 2, [3, 4, 6]],
    [l, l, l, l, l, l, 1, l.slice(1, 9), l.slice(1, 9)],
    [l, l, l, l, l, l, l.slice(1, 9), l.slice(1, 9), l.slice(1, 9)],
    [l, l, l, l, l, l, l.slice(1, 9), l.slice(1, 9), l.slice(1, 9)],
    [1, 2, 3, 1, 2, 3, 1, 2, 3],
    [4, 5, 6, 4, 5, 6, [4], 5, 6],
    [7, 8, [9], 7, [8], 9, 7, 8, 9]
  ];
  t.deepEqual(actual, expected, 'solves the rows');
  t.end();
});

tape('addArr adds and removes duplicates of two arrays', t => {
  actual = addArr([1, 2, 3], [3]);
  expected = [1, 2, 3];
  t.deepEqual(actual, expected, 'adds two simple arrays');
  actual = addArr([], [1, 2, 3]);
  expected = [1, 2, 3];
  t.deepEqual(actual, expected, 'deals with empty arrays');
  t.end();
});

tape('flattenLn flattens an array of arrays to only unique occurances', t => {
  input = [[], [], [], [1, 2, 3], [1, 4]];
  actual = flattenLn(input, []);
  expected = [1, 2, 3, 4];
  t.deepEqual(actual, expected, 'flattens an array of arrays');
  t.end();
});

tape('solveUniqueLn solves a line for a unique solution', t => {
  input = [1, 2, 3, 4, 5, 6, [7, 8], [7, 8], [7, 8, 9]];
  actual = solveUniqueLn(input);
  expected = [1, 2, 3, 4, 5, 6, [7, 8], [7, 8], [9]];
  t.deepEqual(actual, expected, 'solves for easy unique 9');
  input = [1, [2, 7, 8, 9], 3, 4, 5, 6, [7, 8], [7, 8], [7, 8, 9]];
  actual = solveUniqueLn(input);
  expected = [1, [2], 3, 4, 5, 6, [7, 8], [7, 8], [7, 8, 9]];
  t.deepEqual(actual, expected, 'solves for unique 2');
  t.end();
});

tape('solves rows which have unique numbers', t => {
  input = [
    [1, 2, 3, 4, 5, 6, [7, 8, 9], [7, 8], [7, 8]],
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4, 5], [1, 2, 3], 6, 7, 8, 9],
    [[2, 9], [2, 9], [2, 5, 9], 1, 3, 4, 6, 7, 8],
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], 4, 5, 6, 7, 8, 9],
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn()
  ];
  actual = solveUniqueRows(input);
  expected = [
    [1, 2, 3, 4, 5, 6, [9], [7, 8], [7, 8]],
    [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [5], [1, 2, 3], 6, 7, 8, 9],
    [[2, 9], [2, 9], [5], 1, 3, 4, 6, 7, 8],
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], 4, 5, 6, 7, 8, 9],
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn()
  ];
  t.deepEqual(actual, expected, 'solves rows for unique numbers');
  t.end();
});

tape('solves cols which can be solved with determining unique numbers', t => {
  input = [
    [ 1, [ 1, 2, 3, 4 ], [ 2, 9 ], [ 1, 2, 3 ], 1, 1, 1, 1, 1 ],
    [ 2, [ 1, 2, 3, 4 ], [ 2, 9 ], [ 1, 2, 3 ], 2, 2, 2, 2, 2 ],
    [ 3, [ 1, 2, 3, 4 ], [ 2, 5, 9 ], [ 1, 2, 3 ], 3, 3, 3, 3, 3 ],
    [ 4, [ 1, 2, 3, 4, 5 ], 1, 4, 4, 4, 4, 4, 4 ],
    [ 5, [ 1, 2, 3 ], 3, 5, 5, 5, 5, 5, 5 ],
    [ 6, 6, 4, 6, 6, 6, 6, 6, 6 ],
    [ [ 7, 8, 9 ], 7, 6, 7, 7, 7, 7, 7, 7 ],
    [ [ 7, 8 ], 8, 7, 8, 8, 8, 8, 8, 8 ],
    [ [ 7, 8 ], 9, 8, 9, 9, 9, 9, 9, 9 ]
  ];
  actual = solveUniqueCols(input);
  expected = [
    [ 1, [ 1, 2, 3, 4 ], [ 2, 9 ], [ 1, 2, 3 ], 1, 1, 1, 1, 1 ],
    [ 2, [ 1, 2, 3, 4 ], [ 2, 9 ], [ 1, 2, 3 ], 2, 2, 2, 2, 2 ],
    [ 3, [ 1, 2, 3, 4 ], [ 5 ], [ 1, 2, 3 ], 3, 3, 3, 3, 3 ],
    [ 4, [ 5 ], 1, 4, 4, 4, 4, 4, 4 ],
    [ 5, [ 1, 2, 3 ], 3, 5, 5, 5, 5, 5, 5 ],
    [ 6, 6, 4, 6, 6, 6, 6, 6, 6 ],
    [ [ 9 ], 7, 6, 7, 7, 7, 7, 7, 7 ],
    [ [ 7, 8 ], 8, 7, 8, 8, 8, 8, 8, 8 ],
    [ [ 7, 8 ], 9, 8, 9, 9, 9, 9, 9, 9 ]
  ];
  t.deepEqual(actual, expected, 'solves cols for unique numbers');
  t.end();
});

tape('solves cols which can be solved with determining unique numbers', t => {
  input = [
    [1, [2, 5], 3, 4, [2, 5], 6, 7, 8, 9],
    [4, [2, 5], 6, 1, [2, 5], 3, 7, 8, 9],
    [[2, 5, 7], 8, 9, [2, 5, 9], 7, 8, 1, 3, 4],
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    [1, 2, 3, 4, 5, 6, [7, 8, 9], [7, 8, 9], 9],
    [9, 7, 8, 6, 5, 4, 3, 2, 1],
    [7, 8, 9, 4, 5, 6, [7, 8, 9], 1, 2]
  ];
  actual = solveUniqueBoxs(input);
  expected = [
    [1, [2, 5], 3, 4, [2, 5], 6, 7, 8, 9],
    [4, [2,  5], 6, 1, [2, 5], 3, 7, 8, 9],
    [[7], 8, 9, [9], 7, 8, 1, 3, 4],
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    [1, 2, 3, 4, 5, 6, [7, 8, 9], [7, 8, 9], 9],
    [9, 7, 8, 6, 5, 4, 3, 2, 1],
    [7, 8, 9, 4, 5, 6, [7, 8, 9], 1, 2]
  ];
  t.deepEqual(actual, expected, 'solves boxes for unique numbers');
  t.end();
});

tape('replace single arrays with numbers', t => {
  input = [
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    [1, 2, [3], 4, 5, [6, 7], [6, 7], 8, [9]],
    [[1], 2, 3, [4, 5, 6], [4, 5, 6], [4, 5, 6], 7, [8], 9],
    helpers.generateLn(),
    [1, 2, [3], [4], [5], 6, 7, 8, 9],
    helpers.generateLn(),
    helpers.generateLn()
  ];
  actual = replaceArrs(input);
  expected = [
    helpers.generateLn(),
    helpers.generateLn(),
    helpers.generateLn(),
    [1, 2, 3, 4, 5, [6, 7], [6, 7], 8, 9],
    [1, 2, 3, [4, 5, 6], [4, 5, 6], [4, 5, 6], 7, 8, 9],
    helpers.generateLn(),
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    helpers.generateLn(),
    helpers.generateLn()
  ];
  t.deepEqual(actual, expected, 'replaces single arrs with their numbers');
  t.end();
});
