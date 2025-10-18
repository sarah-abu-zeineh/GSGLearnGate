'use client'
import { SealQuestion } from '@phosphor-icons/react'
import React from 'react'

const TaskCardCo = () => {
  return (
    <div data-testid="taskCard-container">
      <li
        data-testid="taskCard-item"
        className="relative flex-col gap-0 p-1 mt-1.5 rounded-xl list-none shadow-lg bg-gradient-to-r from-[#f1f5f9] to-[#e5e7eb] hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full ml-auto"
      >
        <div
          data-testid="taskCard-header"
          className="flex flex-row justify-between items-center mb-4 pl-1"
        >
          <h3
            data-testid="taskCard-title"
            className="text-m md:text-s font-semibold text-gray-900 hover:text-[#FFA41F] transition-all duration-300 ease-in-out"
          >
            Learn react hooks
          </h3>

          <SealQuestion
            data-testid="taskCard-icon"
            size={28}
            weight="fill"
            className="text-[#319DC4] align-middle"
          />
        </div>
        <div data-testid="taskCard-dueSection" className="flex justify-start ml-1.5">
          <span data-testid="taskCard-dueLabel" className="text-xs text-[#FFA41F] font-medium">
            Due Date :
          </span>
          <span data-testid="taskCard-dueDate" className="text-xs text-gray-500 ml-1">
            04/02/2025
          </span>
        </div>
      </li>
    </div>
  )
}

export default TaskCardCo
