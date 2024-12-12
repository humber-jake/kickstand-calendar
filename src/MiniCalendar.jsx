import React from "react";
import "./MiniCalendar.css";
import { daysOfWeek } from "./constants";

const MiniCalendar = (props) => {
  let { currentMonth, selectDay, selectedDay } = props;

  let today = new Date();

  const midMonth = currentMonth[Math.floor(currentMonth.length / 2)];

  function updateSelectedDay() {
    selectDay(day);
  }

  let miniCalendar = currentMonth.map((day, i) => {
    let classes = [];

    classes.push(
      day.toLocaleDateString("en-us") ===
        selectedDay.toLocaleDateString("en-us")
        ? "miniDay selectedDay"
        : "miniDay"
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
    let date = day.toLocaleDateString("en-us", { day: "numeric" });

    return (
      <div key={i} className={classes.join(" ")} onClick={updateSelectedDay}>
        {date}
      </div>
    );
  });

  return (
    <div className="MiniCalendarContainer">
      <div className="dayHeaders">
        {daysOfWeek.map((day, i) => (
          <div className="column" key={i}>
            {day[0]}
          </div>
        ))}
      </div>
      <div className="MiniCalendar">{miniCalendar}</div>
    </div>
  );
};

export default MiniCalendar;
