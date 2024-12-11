// const dt = new Date();
// const day = dt.getDate();
// const year = dt.getFullYear();
// const month = dt.getMonth();
// const daysInMonth = new Date(year, month + 1, 0).getDate();
// let rows = 5;w

// import { daysOfWeek } from "./constants";

// export const getDayArr = (year, month, day) => {
//   let result = new Date(year, month, day)
//     .toLocaleDateString("en-us", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//     .split(",")
//     .join(" ")
//     .split(" ")
//     .filter((i) => i);

//   return {
//     weekday: result[0],
//     month: result[1],
//     date: result[2],
//     year: result[3],
//   };
// };

// export const createMonthArr = () => {
//   let monthArr = [];
//   for (let i = 1; i <= daysInMonth; i++) {
//     monthArr.push(getDayArr(year, month, i));
//   }
//   // Edge case for sunday February 1sts
//   if (monthArr.length == 28 && monthArr[0].weekday == "Sunday") {
//     rows = 4;
//   }
//   // Months starting in Fri or Sat require 6 rows to render all days on screen
//   if (
//     (monthArr.length >= 30 && monthArr[0].weekday == "Saturday") ||
//     (monthArr.length == 31 && monthArr[0].weekday == "Friday")
//   ) {
//     rows = 6;
//   }
//   return monthArr;
// };
// export const padStart = (monthArr) => {
//   let result = monthArr;
//   let days = daysOfWeek.indexOf(monthArr[0].weekday);
//   if (days == 0) return result;

//   for (let i = days; i > 0; i--) {
//     result.unshift(getDayArr(year, month, i - days));
//   }

//   return result;
// };
// export const padEnd = (monthArr) => {
//   let result = monthArr;
//   let days = rows * 7 - monthArr.length;
//   if (days == 0) return result;
//   for (let i = 0; i < days; i++) {
//     result.push(getDayArr(year, month + 1, i + 1));
//   }
//   return result;
// };

// export let currentMonth = padEnd(padStart(createMonthArr()));

// export const midMonth = Object.values(
//   currentMonth[Math.floor(currentMonth.length / 2)]
// ).join(" ");
