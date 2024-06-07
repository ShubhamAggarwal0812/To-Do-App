// client/src/components/Filter.js

import React from "react";

const Filter = ({ filter, handleFilterChange }) => (
  <div className="mb-6 w-full sm:w-1/2">
    <select
      value={filter}
      onChange={handleFilterChange}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="All">All</option>
      <option value="Overdue">Overdue</option>
      <option value="To Do">To Do</option>
      <option value="Done">Done</option>
    </select>
  </div>
);

export default Filter;
