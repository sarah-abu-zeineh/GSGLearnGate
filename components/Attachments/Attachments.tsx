import React, { useState } from "react";

interface IProps {
  paths: string[];
}

const Attachments = ({ paths }: IProps) => {
  const [downloadStates, setDownloadStates] = useState<
    Record<
      string,
      {
        status: "idle" | "loading" | "success" | "error";
        message?: string;
      }
    >
  >(() => {
    const initialState: Record<
      string,
      {
        status: "idle" | "loading" | "success" | "error";
        message?: string;
      }
    > = {};
    paths.forEach((path) => {
      initialState[path] = { status: "idle" };
    });
    return initialState;
  });

  const handleDownload = async (filePath: string) => {
    setDownloadStates((prev) => ({
      ...prev,
      [filePath]: { status: "loading" },
    }));

    try {
      const headResponse = await fetch(filePath, { method: "HEAD" });

      if (!headResponse.ok) {
        throw new Error("File not found on server");
      }

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      let fileName = filePath.split("/").pop() || "download";
      const contentDisposition = response.headers.get("content-disposition");
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch[1]) {
          fileName = filenameMatch[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      setDownloadStates((prev) => ({
        ...prev,
        [filePath]: { status: "success" },
      }));
    } catch {
      setDownloadStates((prev) => ({
        ...prev,
        [filePath]: {
          status: "error",
          message: "Download failed",
        },
      }));

      setTimeout(() => {
        setDownloadStates((prev) => ({
          ...prev,
          [filePath]: { status: "idle" },
        }));
      }, 5000);
    }
  };

  const getFileDisplayName = (path: string) => {
    const fileName = path.split("/").pop() || "file";
    return fileName.length > 30
      ? `${fileName.substring(0, 15)}...${fileName.substring(
          fileName.length - 10
        )}`
      : fileName;
  };

  return (
    <div
      className="border border-orange-100 rounded-lg p-4"
      data-testid="attachments-container"
    >
      <h3 className="font-medium text-[#FFA41F] mb-2" data-testid="attachments-title">
        Attachments
      </h3>

      {paths.length === 0 ? (
        <p className="text-gray-500 text-sm" data-testid="attachments-empty">
          No attachments available
        </p>
      ) : (
        <div className="space-y-2" data-testid="attachments-list">
          {paths.map((path, index) => {
            const state = downloadStates[path] || { status: "idle" };

            return (
              <div
                key={`${path}-${index}`}
                className="flex items-center justify-between bg-orange-50 p-3 rounded-md text-sm"
                data-testid={`attachment-item-${index}`}
              >
                <span
                  className="truncate max-w-[60%]"
                  title={path.split("/").pop()}
                  data-testid={`attachment-filename-${index}`}
                >
                  {index + 1}. {getFileDisplayName(path)}
                </span>

                <div className="flex items-center gap-2" data-testid={`attachment-status-${index}`}>
                  {state.status === "error" && (
                    <span
                      className="text-red-500 text-xs"
                      data-testid={`attachment-error-${index}`}
                    >
                      {state.message || "Error"}
                    </span>
                  )}

                  {state.status === "success" && (
                    <span
                      className="text-green-500 text-xs"
                      data-testid={`attachment-success-${index}`}
                    >
                      ✓ Downloaded
                    </span>
                  )}

                  <button
                    onClick={() => handleDownload(path)}
                    disabled={state.status === "loading"}
                    className={`text-[#FFA41F] hover:text-orange-800 font-medium cursor-pointer disabled:opacity-50 ${
                      state.status === "loading" ? "animate-pulse" : ""
                    }`}
                    data-testid={`attachment-download-button-${index}`}
                  >
                    {state.status === "loading" ? (
                      <span className="flex items-center gap-1">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Downloading
                      </span>
                    ) : (
                      "Download"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Attachments;
