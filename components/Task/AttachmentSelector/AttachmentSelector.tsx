import { useState } from "react";

type AttachmentType = "none" | "link" | "file";

interface AttachmentSelectorProps {
  onAttachmentChange: (type: AttachmentType, value?: string | File) => void; // Callback to pass data to parent
}

export const AttachmentSelector = ({
  onAttachmentChange,
}: AttachmentSelectorProps) => {
  const [attachmentType, setAttachmentType] = useState<AttachmentType>("none");
  const [link, setLink] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as AttachmentType;
    setAttachmentType(newType);
    setLink("");
    setFile(null);
    if (newType === "none") {
      onAttachmentChange("none");
    } else if (newType === "link") {
      onAttachmentChange("link", "");
    } else if (newType === "file") {
      onAttachmentChange("file", undefined);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    onAttachmentChange("link", e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onAttachmentChange("file", selectedFile || undefined);
  };

  return (
    <div className="space-y-4" id="attachment-selector">
      <div>
        <label
          htmlFor="attachmentType"
          className="block text-sm font-medium text-gray-700"
        >
          Attachment Type
        </label>
        <select
          id="attachmentType"
          data-testid="attachment-type-select"
          value={attachmentType}
          onChange={handleTypeChange}
          className="my-1 py-3 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FFA41F] active:border-[#FFA41F] sm:text-sm"
        >
          <option value="none">No Attachment</option>
          <option value="link">Link</option>
          <option value="file">File</option>
        </select>
      </div>

      {attachmentType === "link" && (
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700"
          >
            Attachment Link
          </label>
          <input
            type="url"
            id="link"
            data-testid="attachment-link-input"
            name="url"
            value={link}
            placeholder="https://domainname.url.com"
            onChange={handleLinkChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FFA41F] focus:border-[#FFA41F]"
          />
        </div>
      )}

      {attachmentType === "file" && (
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <input
            type="file"
            id="file"
            data-testid="attachment-file-input"
            name="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-[#FFA41F] file:px-4 file:py-2 file:text-white file:shadow-sm hover:file:bg-[#ffd9a0]"
          />
          {file && (
            <p
              className="mt-1 text-sm text-gray-600"
              data-testid="selected-file-name"
            >
              Selected: {file.name}
            </p>
          )}
        </div>
      )}

      {attachmentType === "none" && (
        <p className="text-sm text-gray-600" data-testid="no-attachment-text">
          No attachments
        </p>
      )}
    </div>
  );
};
