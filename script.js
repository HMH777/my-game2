let points = 0n;
let pointsPerSecond = 1n;
let reserve = 0n;
let upgrade1Cost = 10n;
let upgrade2Cost = 50n;
let upgrade1Level = 0n;
let upgrade2Level = 0n;
let baseUp1 = 2n;
const number = document.getElementById("number");
const PPS = document.getElementById("PPS");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");
function updateUI() {
  number.textContent = `points: ${formatBigInt(points)}`;
  PPS.textContent = `points per second: ${formatBigInt(pointsPerSecond)}`;
  if (upgrade1) {
    upgrade1.textContent = `${formatBigInt(baseUp1)}x points gain, cost: ${formatBigInt(upgrade1Cost)}`;
  }
  if (upgrade2) {
    upgrade2.textContent = `+1 base on upgrade 1, cost: ${formatBigInt(upgrade2Cost)}`;
  }
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
if (upgrade1) {
  upgrade1.onclick = function () {
    if (points >= upgrade1Cost) {
      points -= upgrade1Cost;
      upgrade1Level += 1n;
      pointsPerSecond = baseUp1 ** upgrade1Level;
      upgrade1Cost = (upgrade1Cost / 10n) * 25n;
    }
  };
}
if (upgrade2) {
  upgrade2.onclick = function () {
    if (points >= upgrade2Cost) {
      points -= upgrade2Cost;
      upgrade2Level += 1n;
      baseUp1 = 2n + upgrade2Level;
      upgrade2Cost = upgrade2Cost * 4n;
    }
  };
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
