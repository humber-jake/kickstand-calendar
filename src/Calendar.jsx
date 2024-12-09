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

  // TODO: write function to apply shift classes (MWFS = OttP, Thurs = WTQ)

  let calendar = currentMonth.map((day, i) => {
    let { weekday, month, date, year } = day;
    let classes = ["day"];

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
      classes.push("today");
    }

    return (
      <div
        className={
          classes.join(" ")
          // !midMonth.includes(month || date || year)
          //   ? "day extraneous"
          //   : `${month} ${date} ${year}` == today
          //   ? "day today"
          //   : "day"
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
