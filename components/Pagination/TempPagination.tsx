import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePreviousPage: (page: number) => void;
  onPageChange: (page: number) => void;
}

const TempPagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  onPageChange,
}: IProps) => {
  return (
    <div
      data-testid="pagination-container"
      className="flex items-center justify-between max-sm:w-[95%] max-sm:m-auto"
    >
      <p data-testid="pagination-info" className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          data-testid="pagination-prev"
          className="p-2 border border-gray-200 rounded-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:bg-gray-100"
          disabled={currentPage === 1}
          onClick={() => handlePreviousPage(currentPage - 1)}
        >
          <CaretLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            data-testid={`pagination-page-${index + 1}`}
            className={`px-3 py-1 border border-gray-200 rounded-md transition-all duration-200 ease-in-out cursor-pointer ${
              currentPage === index + 1
                ? "bg-[#FFA41F] text-white hover:bg-[#FFB347]"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          data-testid="pagination-next"
          className="p-2 border border-gray-200 rounded-md text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => handleNextPage(currentPage + 1)}
        >
          <CaretRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default TempPagination;
