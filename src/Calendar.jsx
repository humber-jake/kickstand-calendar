import React from "react";
import "./Calendar.css";
import { daysOfWeek } from "./constants";
import Shift from "./Shift";

const Calendar = (props) => {
  let {
    currentMonth,
    selectDay,
    selectedDay,
    midMonth,
    shifts,
    openShiftModal,
    openEditModal,
  } = props;

  let today = new Date();

  function updateSelectedDay() {
    selectDay(day);
  }

  let calendar = currentMonth.map((day, i) => {
    let classes = [];

    classes.push(
      day.toLocaleDateString("en-us") ===
        selectedDay.toLocaleDateString("en-us")
        ? "day selectedDay"
        : "day"
    );

    function updateSelectedDay() {
      selectDay(day);
    }

    switch (daysOfWeek[day.getDay()]) {
      case "Monday":
        classes.push("OttP");
        break;
      case "Wednesday":
        classes.push("OttP");
        break;
      case "Friday":
        classes.push("OttP");
        break;
      case "Sunday":
        classes.push("OttP");
        break;
      case "Thursday":
        classes.push("WTQ");
        break;
    }

    if (midMonth.getMonth() !== day.getMonth()) {
      classes.push("extraneous");
    }

    if (day == today) {
      classes.push("today");
    }

    let weekday = day.toLocaleDateString("en-us", { weekday: "long" });
    let year = day.toLocaleDateString("en-us", { year: "numeric" });
    let month = day.toLocaleDateString("en-us", { month: "long" });
    let date = day.toLocaleDateString("en-us", { day: "numeric" });

    return (
      <div className={classes.join(" ")} key={i} onClick={updateSelectedDay}>
        <div className="dayHeader">
          <div className="date"> {date}</div>
          <div className="addShift" onClick={openShiftModal}>
            +
          </div>
        </div>
        <div className="shifts">
          {shifts[day.toISOString().substring(0, 10)] &&
            shifts[day.toISOString().substring(0, 10)].map((shift, i) => (
              <Shift openEditModal={openEditModal} key={i} shift={shift} />
            ))}
        </div>
      </div>
    );
  });

  return <div className="Calendar">{calendar}</div>;
};

export default Calendar;
