import { useState, useEffect } from "react";
import "./App.css";
import Calendar from "./Calendar";
import MiniCalendar from "./MiniCalendar";
import AddShiftModal from "./AddShiftModal";
import { daysOfWeek } from "./constants";
import Sidebar from "./Sidebar";
import supabase from "../utils/supabase";
import EditModal from "./EditModal";

function App() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    getShifts();
  }, []);

  async function getShifts() {
    const { data } = await supabase.from("shifts").select("*");
    let shifts = {};

    // format as object where date=key for quick lookup on Calendar rendering
    data.forEach((shift) => {
      if (!shifts[shift.date]) {
        shifts[shift.date] = [shift];
      } else {
        shifts[shift.date].push(shift);
      }
    });

    setShifts(shifts);
    console.log(shifts);
  }

  const dt = new Date();
  const day = dt.getDate();
  const year = dt.getFullYear();
  const [month, setMonth] = useState(dt.getMonth());
  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editShiftTarget, setEditShiftTarget] = useState({});
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

  // const today = getDayObj(year, dt.getMonth(), day);
  const today = new Date(year, dt.getMonth(), day);
  const [selectedDay, setSelectedDay] = useState(today);

  // create array to populate current calendar window
  const createMonthArr = () => {
    let monthArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // monthArr.push(getDayObj(year, month, i));
      monthArr.push(new Date(year, month, i));
    }
    // Edge case for sunday February 1sts
    if (monthArr.length == 28 && daysOfWeek[monthArr[0].getDay()] == "Sunday") {
      rows = 4;
    }
    // Months starting in Fri or Sat require 6 rows to render all days on screen
    if (
      (monthArr.length >= 30 &&
        daysOfWeek[monthArr[0].getDay()] == "Saturday") ||
      (monthArr.length == 31 && daysOfWeek[monthArr[0].getDay()] == "Friday")
    ) {
      rows = 6;
    }

    // padStart days
    let startDays = daysOfWeek.indexOf(daysOfWeek[monthArr[0].getDay()]);
    if (startDays !== 0) {
      for (let i = startDays; i > 0; i--) {
        monthArr.unshift(new Date(year, month, i - startDays));
      }
    }

    // padEnd days
    let endDays = rows * 7 - monthArr.length;
    if (endDays !== 0) {
      for (let i = 0; i < endDays; i++) {
        monthArr.push(new Date(year, month + 1, i + 1));
      }
    }
    return monthArr;
  };

  let currentMonth = createMonthArr();

  // get middle value of currentMonth arr for displaying Month name
  const midMonth = currentMonth[Math.floor(currentMonth.length / 2)];

  let prevMonthString = new Date(
    year,
    midMonth.getMonth() - 1,
    15
  ).toLocaleDateString("en-us", {
    month: "short",
  });
  let nextMonthString = new Date(
    year,
    midMonth.getMonth() + 1,
    15
  ).toLocaleDateString("en-us", {
    month: "short",
  });

  // Click Handlers

  function selectDay(day) {
    setSelectedDay(day);
  }

  function backMonth() {
    setMonth(month - 1);
  }

  function forwardMonth() {
    setMonth(month + 1);
  }

  function toToday() {
    setMonth(dt.getMonth());
    setSelectedDay(today);
  }

  function openShiftModal() {
    setShiftModalOpen(!shiftModalOpen);
  }
  function hideShiftModal() {
    setShiftModalOpen(false);
  }
  function openEditModal(shift) {
    setEditModalOpen(!editModalOpen);
    setEditShiftTarget(shift);
  }
  function hideEditModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <Sidebar
        midMonth={midMonth}
        currentMonth={currentMonth}
        backMonth={backMonth}
        toToday={toToday}
        forwardMonth={forwardMonth}
        openShiftModal={openShiftModal}
        selectDay={selectDay}
        selectedDay={selectedDay}
        prev={prevMonthString}
        next={nextMonthString}
      />
      <AddShiftModal
        shifts={shifts}
        setShifts={setShifts}
        hideShiftModal={hideShiftModal}
        openShiftModal={openShiftModal}
        shiftModalOpen={shiftModalOpen}
        midMonth={midMonth}
        backMonth={backMonth}
        forwardMonth={forwardMonth}
        toToday={toToday}
        currentMonth={currentMonth}
        selectDay={selectDay}
        selectedDay={selectedDay}
        prev={prevMonthString}
        next={nextMonthString}
      />
      <EditModal
        shifts={shifts}
        setShifts={setShifts}
        hideEditModal={hideEditModal}
        editModalOpen={editModalOpen}
        midMonth={midMonth}
        backMonth={backMonth}
        forwardMonth={forwardMonth}
        toToday={toToday}
        currentMonth={currentMonth}
        selectDay={selectDay}
        selectedDay={selectedDay}
        shift={editShiftTarget}
        prev={prevMonthString}
        next={nextMonthString}
      />
      <div className="calendarContainer">
        <div className="columnHeaders">
          {daysOfWeek.map((day, i) => (
            <div className="column" key={i}>
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        <Calendar
          openShiftModal={openShiftModal}
          openEditModal={openEditModal}
          midMonth={midMonth}
          currentMonth={currentMonth}
          selectDay={selectDay}
          selectedDay={selectedDay}
          shifts={shifts}
        />
      </div>
    </>
  );
}

export default App;
