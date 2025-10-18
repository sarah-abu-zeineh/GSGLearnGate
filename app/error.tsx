"use client";

interface IProps {
  error: Error;
}

const ErrorPage = ({ error }: IProps) => {
  return (
    <div id="error-page-container" className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div id="error-card" className="bg-white shadow-lg rounded-3xl p-8 max-w-xl w-full text-center border border-gray-200">
        <h2 id="error-title" className="text-5xl font-extrabold text-[#FFA41F] mb-5">Oops!</h2>

        <p id="error-description" className="text-lg text-gray-600 mb-6">
          Something went wrong. Please try refreshing the page or contact
          support if the issue persists.
        </p>

        <div id="error-action-container" className="flex justify-center gap-4 mb-6">
          <button 
            id="refresh-button"
            onClick={() => window.location.reload()}
            className="bg-[#FFA41F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#FFA41F]/80 transition-all"
          >
            Refresh Page
          </button>
        </div>

        <div  id="error-details-box" className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm mt-8 text-sm text-gray-700 text-left">
          <strong id="error-details-label" className="text-gray-900">Error Details:</strong>{" "}
          <span id="error-message" className="text-red-600 break-words">{error.message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;