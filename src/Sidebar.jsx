import React from "react";
import MiniCalendar from "./MiniCalendar";

const Sidebar = (props) => {
  const {
    midMonth,
    currentMonth,
    backMonth,
    forwardMonth,
    openShiftModal,
    selectDay,
    selectedDay,
  } = props;
  return (
    <div className="sidebar">
      Sidebar
      <div>
        <p className="miniYear">
          {midMonth.toLocaleDateString("en-us", {
            year: "numeric",
          })}
        </p>
        <p className="miniMonth">
          {midMonth.toLocaleDateString("en-us", {
            month: "long",
          })}
        </p>
      </div>
      <div className="buttons">
        <button onClick={backMonth}>{`<--`}</button>
        <button onClick={forwardMonth}>{`-->`}</button>
      </div>
      <MiniCalendar
        currentMonth={currentMonth}
        selectDay={selectDay}
        selectedDay={selectedDay}
      />
      <div className="actions">
        <button onClick={openShiftModal}>Add Shift</button>
        <button>Log Hours</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default Sidebar;
