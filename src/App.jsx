import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Calendar";
import MiniCalendar from "./MiniCalendar";
import ShiftModal from "./ShiftModal";
import { daysOfWeek } from "./constants";
import Sidebar from "./Sidebar";

function App() {
  const dt = new Date();
  const day = dt.getDate();
  const year = dt.getFullYear();
  const [month, setMonth] = useState(dt.getMonth());
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let rows = 5;

  // create readable obj for any given Date() object
  const getDayObj = (year, month, day) => {
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

  const today = getDayObj(year, dt.getMonth(), day);
  const [selectedDay, setSelectedDay] = useState(today);

  // create array to populate current calendar window
  const createMonthArr = () => {
    let monthArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      monthArr.push(getDayObj(year, month, i));
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

    // padStart days
    let startDays = daysOfWeek.indexOf(monthArr[0].weekday);
    if (startDays !== 0) {
      for (let i = startDays; i > 0; i--) {
        monthArr.unshift(getDayObj(year, month, i - startDays));
      }
    }

    // padEnd days
    let endDays = rows * 7 - monthArr.length;
    if (endDays !== 0) {
      for (let i = 0; i < endDays; i++) {
        monthArr.push(getDayObj(year, month + 1, i + 1));
      }
    }

    return monthArr;
  };

  let currentMonth = createMonthArr();

  // get middle value of currentMonth arr for displaying Month name
  const midMonth = currentMonth[Math.floor(currentMonth.length / 2)];

  // Click Handlers

  function selectDay(day) {
    setSelectedDay(day);
  }

  const backMonth = () => {
    setMonth(month - 1);
  };

  const forwardMonth = () => {
    setMonth(month + 1);
  };

  function openShiftModal() {
    setShiftModalOpen(!shiftModalOpen);
  }
  function hideShiftModal() {
    setShiftModalOpen(false);
  }

  return (
    <>
      <Sidebar
        midMonth={midMonth}
        currentMonth={currentMonth}
        backMonth={backMonth}
        forwardMonth={forwardMonth}
        openShiftModal={openShiftModal}
        selectDay={selectDay}
        selectedDay={selectedDay}
      />
      <ShiftModal
        hideShiftModal={hideShiftModal}
        openShiftModal={openShiftModal}
        shiftModalOpen={shiftModalOpen}
        midMonth={midMonth}
        backMonth={backMonth}
        forwardMonth={forwardMonth}
        currentMonth={currentMonth}
        today={today}
        selectDay={selectDay}
        selectedDay={selectedDay}
      />
      <div className="calendarContainer">
        <div className="dayHeaders">
          {daysOfWeek.map((day, i) => (
            <div className="column" key={i}>
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        <Calendar
          currentMonth={currentMonth}
          selectDay={selectDay}
          selectedDay={selectedDay}
        />
      </div>
    </>
  );
}

export default App;
