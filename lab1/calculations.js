// const mu = 'μ';
// const sigma = 'σ';
// const alpha = 'α';
// const xi = 'ξ';
// const lambda = 'λ';

const { random, sqrt, PI, exp } = Math;
const sum = (...args) => args.reduce((a, b) => a + b, 0);
const average = (...args) => sum(...args) / args.length;
const arr = (length) => Array(length).fill(0);

const sigma = 3;
const alpha = 5;
const NUM = 10000;

const muArr = arr(NUM).map(() => sum(...arr(12).map(random)) - 6);

export const xiArr = muArr.map((mu) => sigma * mu + alpha);

const f = (x) =>
  (1 / (sigma * sqrt(2 * PI))) * exp(-((x - alpha) ** 2) / (2 * sigma ** 2));

export const fx = xiArr.map(f);

const D = sqrt(
  xiArr.reduce((acc, xi, index) => acc + (xi - muArr[index]) ** 2, 0) / NUM
);

const lambda = 1 / D;

console.dir({
  average: average(...xiArr),
  fx,
  D,
});
