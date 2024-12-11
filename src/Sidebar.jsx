import React from "react";
import MiniCalendar from "./MiniCalendar";

const Sidebar = (props) => {
  const { midMonth, currentMonth, backMonth, forwardMonth, openShiftModal } =
    props;
  return (
    <div className="sidebar">
      Sidebar
      <div>
        <p className="miniYear">{midMonth.year}</p>
        <p className="miniMonth">{midMonth.month}</p>
      </div>
      <div className="buttons">
        <button onClick={backMonth}>{`<--`}</button>
        <button onClick={forwardMonth}>{`-->`}</button>
      </div>
      <MiniCalendar currentMonth={currentMonth} />
      <div className="actions">
        <button onClick={openShiftModal}>Add Shift</button>
        <button>Log Hours</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default Sidebar;