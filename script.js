let points = 0n;
let pointsPerSecond = 1n;
let reserve = 0n;
const number = document.getElementById("number");
const PPS = document.getElementById("PPS");
function updateUI() {
  number.textContent = `points: ${formatBigInt(points)}`;
  PPS.textContent = `points per second: ${formatBigInt(pointsPerSecond)}`;
}
function formatBigInt(bigIntValue) {
  const str = bigIntValue.toString();
  if (str.length <= 5) {
    return str;
  }
  const firstDigit = str[0];
  const decimals = str.slice(1, 3);
  const exponent = str.length - 1;
  return `${firstDigit}.${decimals}e${exponent}`;
}
setInterval(() => {
  points += pointsPerSecond / 10n;
  reserve += pointsPerSecond * 10n;
  if (reserve >= 100n) {
    points += 1n;
    reserve -= 100n;
  }
  updateUI();
}, 100);
