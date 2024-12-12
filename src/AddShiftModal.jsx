import React from "react";
import MiniCalendar from "./MiniCalendar";
import "./AddShiftModal.css";
import { roles } from "./constants";
import supabase from "../utils/supabase";

const AddShiftModal = (props) => {
  const {
    hideShiftModal,
    openShiftModal,
    shiftModalOpen,
    midMonth,
    currentMonth,
    backMonth,
    forwardMonth,
    toToday,
    selectDay,
    selectedDay,
    prev,
    next,
    shifts,
    setShifts,
  } = props;

  let today = new Date();

  today.setHours(0, 0, 0);

  async function addShift(e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);
    let data = Object.fromEntries(formData);

    if (data.date < today.toISOString().substring(0, 10)) {
      alert("Unfortunately, we cannot change the past.");
      return;
    }

    const { response, error } = await supabase
      .from("shifts")
      .insert(data)
      .select();

    alert("shift added.");
    hideShiftModal();

    // render added shift to the page without re-calling database
    let result = shifts;
    if (!result[data.date]) {
      result[data.date] = [data];
    } else {
      result[data.date].push(data);
    }
    setShifts(result);
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
    <div className={shiftModalOpen ? "AddShiftModal" : "AddShiftModal hidden"}>
      <div className="Modal">
        <button
          type="button"
          form="addShiftForm"
          className="close"
          onClick={cancelAddShift}
        >
          +
        </button>
        <h2>Add Shift</h2>
        <p className="miniMonth">
          {midMonth.toLocaleDateString("en-us", { month: "long" })}
        </p>
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
        ></MiniCalendar>
        <form id="addShiftForm" className="addShiftForm" onSubmit={addShift}>
          <label htmlFor="name">Your name:</label>
          <input id="name" name="name" type="text" required />

          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={selectedDay.toISOString().substring(0, 10)}
            readOnly
          />

          <label htmlFor="shiftStart">Start time:</label>
          <input
            id="shiftStart"
            name="shiftStart"
            type="time"
            defaultValue={
              today.toLocaleDateString("en-us", { weekday: "long" }) == "Sunday"
                ? "13:00"
                : "17:00"
            }
          />

          <label htmlFor="shiftEnd">End time:</label>
          <input
            id="shiftEnd"
            name="shiftEnd"
            type="time"
            defaultValue={
              today.toLocaleDateString("en-us", { weekday: "long" }) == "Sunday"
                ? "17:00"
                : "21:00"
            }
          />

          <label htmlFor="role">Role:</label>
          <select name="role" id="role">
            {roleOptions}
          </select>

          <label htmlFor="comments">Additional Comments:</label>
          <textarea name="comments" id="comments" rows="3"></textarea>
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

export default AddShiftModal;
