import React from "react";
import MiniCalendar from "./MiniCalendar";
import "./ShiftModal.css";
import { roles } from "./constants";

const ShiftModal = (props) => {
  const {
    hideShiftModal,
    openShiftModal,
    shiftModalOpen,
    midMonth,
    currentMonth,
    today,
    backMonth,
    forwardMonth,
  } = props;

  function addShift(e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);
    let data = Object.fromEntries(formData);

    console.log(data);
    alert("shift added.");
    hideShiftModal();
  }

  function cancelAddShift(e) {
    e.target.form.reset();
    hideShiftModal();
  }

  let roleOptions = roles.map((role, i) => (
    <option key={i} value={role}>
      {role}
    </option>
  ));

  return (
    <div className={shiftModalOpen ? "ShiftModal" : "ShiftModal hidden"}>
      <div className="Modal">
        <button
          type="button"
          form="addShiftForm"
          className="close"
          onClick={cancelAddShift}
        >
          X
        </button>
        <h2>Add Shift</h2>
        <p className="miniMonth">{midMonth.month}</p>
        <div className="buttons">
          <button onClick={backMonth}>{`<--`}</button>
          <button onClick={forwardMonth}>{`-->`}</button>
        </div>
        <MiniCalendar currentMonth={currentMonth}></MiniCalendar>
        <form id="addShiftForm" className="addShiftForm" onSubmit={addShift}>
          <label htmlFor="name">Your name:</label>
          <input id="name" name="name" type="text" />
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="number"
            defaultValue={today.date}
          />
          <label htmlFor="shiftStart">Start time:</label>
          <input
            id="shiftStart"
            name="shiftStart"
            type="time"
            defaultValue={today.weekday == "Sunday" ? "13:00" : "17:00"}
          />
          <label htmlFor="shiftEnd">End time:</label>
          <input
            id="shiftEnd"
            name="shiftEnd"
            type="time"
            defaultValue={today.weekday == "Sunday" ? "17:00" : "21:00"}
          />
          <label htmlFor="role">Role:</label>
          <select name="role" id="role">
            {roleOptions}
          </select>
          <label htmlFor="comments">Additional Comments:</label>
          <textarea name="comments" id="comments" defaultValue={""}></textarea>
        </form>
        <div className="buttons">
          <button form="addShiftForm" type="submit" onClick={addShift}>
            Add Shift
          </button>
          <button type="button" form="addShiftForm" onClick={cancelAddShift}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftModal;