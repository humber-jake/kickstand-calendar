import React from "react";

const Shift = (props) => {
  const { shift, openEditModal } = props;

  function callOpenEditModal() {
    openEditModal(shift);
  }
  return (
    <div
      className={`volunteerName ${shift.role.split(" ").join("")}`}
      onClick={callOpenEditModal}
    >
      {shift.name}
    </div>
  );
};

export default Shift;
