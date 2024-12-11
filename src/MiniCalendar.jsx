import React from "react";
import "./MiniCalendar.css";

const MiniCalendar = (props) => {
  let { currentMonth, selectDay, selectedDay } = props;

  let today = new Date()
    .toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .split(",")
    .join("");

  const midMonth = Object.values(
    currentMonth[Math.floor(currentMonth.length / 2)]
  ).join(" ");

  function updateSelectedDay() {
    selectDay(day);
  }

  let miniCalendar = currentMonth.map((day, i) => {
    let { weekday, month, date, year } = day;
    let classes = [];

    classes.push(
      Object.values(day).join(" ") === Object.values(selectedDay).join(" ")
        ? "miniDay selectedDay"
        : "miniDay"
    );

    function updateSelectedDay() {
      selectDay(day);
    }

    switch (weekday) {
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

    if (!midMonth.includes(month || date || year)) {
      classes.push("extraneous");
    }
    if (`${month} ${date} ${year}` == today) {
      classes.push("miniToday");
    }

    return (
      <div key={i} className={classes.join(" ")} onClick={updateSelectedDay}>
        {date}
      </div>
    );
  });

  return (
    <div className="MiniCalendarContainer">
      <div className="MiniCalendar">{miniCalendar}</div>
    </div>
  );
};

export default MiniCalendar;
