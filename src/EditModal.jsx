import { React, useState } from "react";
import MiniCalendar from "./MiniCalendar";
import "./EditModal.css";
import { roles } from "./constants";
import supabase from "../utils/supabase";

const EditModal = (props) => {
  const {
    hideEditModal,
    openEditModal,
    editModalOpen,
    midMonth,
    currentMonth,
    backMonth,
    forwardMonth,
    toToday,
    selectDay,
    selectedDay,
    prev,
    next,
    shift,
    shifts,
    setShifts,
  } = props;

  let today = new Date();

  async function editShift(e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);
    let data = Object.fromEntries(formData);

    for (const prop in shift) {
      if (!data[prop]) {
        data[prop] = shift[prop];
      }
    }

    const { response, error } = await supabase
      .from("shifts")
      .update(data)
      .eq("id", shift.id)
      .select();

    // render edited shift changes without re-calling database
    let result = shifts;
    if (!result[data.date]) {
      result[data.date] = [data];
    } else {
      result[data.date].forEach((shift, i) => {
        if (shift.id == data.id) {
          result[data.date][i] = data;
        }
      });
    }
    setShifts(result);

    console.log("Shift Edited.");
    e.target.form.reset();
    hideEditModal();
  }

  async function deleteShift(e) {
    e.preventDefault();
    let formData = new FormData(e.target.form);
    let data = Object.fromEntries(formData);

    const response = await supabase.from("shifts").delete().eq("id", shift.id);

    console.log();

    let result = shifts;
    console.log(result);
    result[data.date].forEach((el, i) => {
      if (el.id == shift.id) {
        result[data.date].splice(i, 1);
      }
    });
    setShifts(result);

    e.target.form.reset();
    hideEditModal();
  }

  function cancelEdit(e) {
    e.target.form.reset();
    hideEditModal();
  }

  let roleOptions = roles.map((role, i) => <option key={i}>{role}</option>);

  return (
    <div className={editModalOpen ? "EditModal" : "EditModal hidden"}>
      <div className="Modal">
        <button
          type="button"
          form="editShiftForm"
          className="close"
          onClick={cancelEdit}
        >
          +
        </button>
        <h2>Edit / Delete Shift</h2>
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
        <form id="editShiftForm" className="editShiftForm" onSubmit={editShift}>
          <label htmlFor="name">Your name:</label>
          <input id="name" name="name" type="text" defaultValue={shift.name} />

          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={shift.date}
            readOnly
          />

          <label htmlFor="shiftStart">Start time:</label>
          <input
            id="shiftStart"
            name="shiftStart"
            type="time"
            defaultValue={shift.shiftStart}
          />

          <label htmlFor="shiftEnd">End time:</label>
          <input
            id="shiftEnd"
            name="shiftEnd"
            type="time"
            defaultValue={shift.shiftEnd}
          />

          <label htmlFor="role">Role:</label>
          <select name="role" id="role" defaultValue={shift.role}>
            {roleOptions}
          </select>

          <label htmlFor="comments">Additional Comments:</label>
          <textarea name="comments" id="comments" rows="3"></textarea>
        </form>
        <div className="buttons">
          <button form="editShiftForm" type="submit" onClick={editShift}>
            Save Changes
          </button>
          <button form="editShiftForm" type="submit" onClick={deleteShift}>
            Delete
          </button>
          <button type="button" form="editShiftForm" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
