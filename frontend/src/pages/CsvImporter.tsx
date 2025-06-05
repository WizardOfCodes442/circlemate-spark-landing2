// components/CsvImporter.tsx

import React, { useState } from "react";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://circlemate-spark-landing-jet.vercel.app"
    : "http://localhost:3000";

export const CsvImporter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setError(null);
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a CSV file first.");
      return;
    }

    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const res = await fetch(`${API_BASE}/api/import-csv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Upload failed: ${res.status} ${res.statusText} — ${text}`
        );
      }

      const body = await res.json();
      setMessage(
        body.insertedCount != null
          ? `Success! Inserted ${body.insertedCount} records.`
          : "Uploaded successfully."
      );
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Import Waitlist CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload CSV"}
      </button>

      {message && (
        <p className="text-green-600 text-sm font-medium">{message}</p>
      )}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default CsvImporter;
