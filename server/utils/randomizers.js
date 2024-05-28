function roll(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function rollD4() {
    return roll(1, 4);
};

function rollD6() {
    return roll(1, 6);
};

function rollD8() {
    return roll(1, 8);
};

function rollD10() {
    return roll(1, 10);
};

function rollD12() {
    return roll(1, 12);
};

function rollD20() {
    return roll(1, 20);
};

function rollD100() {
    return roll(1, 100);
};

console.log("d4 Roll = " + rollD4());

console.log("d6 Roll = " + rollD6());

console.log("d8 Roll = " + rollD8());

console.log("d10 Roll = " + rollD10());

console.log("d12 Roll = " + rollD12());

console.log("d20 Roll = " + rollD20());

console.log("d100 Roll = " + rollD100());

// RUN IT
// node .\server\utils\randomizers.js
