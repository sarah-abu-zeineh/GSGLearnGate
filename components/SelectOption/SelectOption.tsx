import React from "react";

const SelectOption = () => {
  return (
    <div data-testid="select-option-container">
      <select
        data-testid="select-option-dropdown"
        className="px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA41F] focus:border-transparent"
      >
        <option data-testid="select-option-all">All Tasks</option>
        <option data-testid="select-option-completed">Completed Tasks</option>
        <option data-testid="select-option-in-progress">In Progress Tasks</option>
      </select>
    </div>
  );
};

export default SelectOption;
