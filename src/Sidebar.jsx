import React from "react";
import MiniCalendar from "./MiniCalendar";

const Sidebar = (props) => {
  const {
    midMonth,
    currentMonth,
    backMonth,
    forwardMonth,
    toToday,
    openShiftModal,
    selectDay,
    selectedDay,
    prev,
    next,
  } = props;
  return (
    <div className="sidebar">
      <img className="logo" src="/images/kc-logo.svg" alt="kickstand-logo" />
      <div>
        <p className="miniMonth">
          {midMonth.toLocaleDateString("en-us", {
            month: "long",
          })}
        </p>
        <p className="miniYear">
          {midMonth.toLocaleDateString("en-us", {
            year: "numeric",
          })}
        </p>
      </div>
      <div className="buttons">
        <button className="prev" onClick={backMonth}>
          <div>{prev}</div>
        </button>
        <button className="todayButton" onClick={toToday}>
          Today
        </button>
        <button className="next" onClick={forwardMonth}>
          <div>{next}</div>
        </button>
      </div>
      <MiniCalendar
        currentMonth={currentMonth}
        selectDay={selectDay}
        selectedDay={selectedDay}
      />
      <div className="actions">
        <button onClick={openShiftModal}>Add Shift</button>
        <button disabled>Log Hours</button>
        <button disabled>Settings</button>
      </div>
    </div>
  );
};

export default Sidebar;
