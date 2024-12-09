import React from "react";
import "./Calendar.css";

const Calendar = (props) => {
  let { currentMonth } = props;

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

  let calendar = currentMonth.map((day, i) => {
    let { weekday, month, date, year } = day;

    return (
      <div
        className={
          !midMonth.includes(month || date || year)
            ? "day extraneous"
            : `${month} ${date} ${year}` == today
            ? "day today"
            : "day"
        }
        key={i}
      >
        <div className="date"> {date}</div>
        <div className="weekday">{weekday}</div>
        <div className="month"> {month}</div>
        <div className="year"> {year}</div>
      </div>
    );
  });

  return <div className="Calendar">{calendar}</div>;
};

export default Calendar;
