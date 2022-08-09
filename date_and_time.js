const date = require("date-and-time");

const now = new Date(Date.now());
// const tmp = date.format(now, "YYYY/MM/DD HH:mm:ss");

const now1 = new Date(2022, 8, 9, 23, 0, 0);
// const tmp1 = date.format(now1, "YYYY/MM/DD HH:mm:ss");

const res = new Date(now1.getTime() - now.getTime());
const res1 = date.format(res, "mm");
console.log(res1);
