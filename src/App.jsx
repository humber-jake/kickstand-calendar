import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Calendar";

function App() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dt = new Date();
  const day = dt.getDate();
  const year = dt.getFullYear();
  const [month, setMonth] = useState(dt.getMonth());
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let rows = 5;

  const backmonth = () => {
    setMonth(month - 1);
  };

  const forwardmonth = () => {
    setMonth(month + 1);
  };

  const getDayArr = (year, month, day) => {
    let result = new Date(year, month, day)
      .toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .split(",")
      .join(" ")
      .split(" ")
      .filter((i) => i);

    return {
      weekday: result[0],
      month: result[1],
      date: result[2],
      year: result[3],
    };
  };
  const createMonthArr = () => {
    let monthArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      monthArr.push(getDayArr(year, month, i));
    }
    // Edge case for sunday February 1sts
    if (monthArr.length == 28 && monthArr[0].weekday == "Sunday") {
      rows = 4;
    }
    // Months starting in Fri or Sat require 6 rows to render all days on screen
    if (
      (monthArr.length >= 30 && monthArr[0].weekday == "Saturday") ||
      (monthArr.length == 31 && monthArr[0].weekday == "Friday")
    ) {
      rows = 6;
    }
    return monthArr;
  };
  const padStart = (monthArr) => {
    let result = monthArr;
    let days = daysOfWeek.indexOf(monthArr[0].weekday);
    if (days == 0) return result;

    for (let i = days; i > 0; i--) {
      result.unshift(getDayArr(year, month, i - days));
    }

    return result;
  };
  const padEnd = (monthArr) => {
    let result = monthArr;
    let days = rows * 7 - monthArr.length;
    if (days == 0) return result;
    for (let i = 0; i < days; i++) {
      result.push(getDayArr(year, month + 1, i + 1));
    }
    return result;
  };

  let currentMonth = padEnd(padStart(createMonthArr()));

  return (
    <>
      <div className="sidebar">
        Sidebar
        <br />
        <button onClick={backmonth}>{`<--`}</button>
        <button onClick={forwardmonth}>{`-->`}</button>
      </div>
      <div className="calendarContainer">
        <div className="dayHeaders">
          {daysOfWeek.map((day, i) => (
            <div className="column" key={i}>
              {day[0]}
              {day[1]}
              {day[2]}
            </div>
          ))}
        </div>
        <Calendar currentMonth={currentMonth} />
      </div>
    </>
  );
}

export default App;
