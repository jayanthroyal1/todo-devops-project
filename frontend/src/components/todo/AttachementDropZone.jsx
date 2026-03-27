import { useDropzone } from "react-dropzone";

const AttachmentDropzone = ({ files, setFiles }) => {
  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`rounded-2xl border-2 border-dashed p-6 text-center transition cursor-pointer ${
          isDragActive
            ? "border-slate-900 bg-slate-100"
            : "border-slate-300 bg-slate-50"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm font-medium text-slate-700">
          Drag & drop files here
        </p>
        <p className="mt-1 text-xs text-slate-500">
          or click to upload attachments
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm text-slate-700">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentDropzone;
