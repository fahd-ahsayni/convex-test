import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const listImgs = useQuery(api.images.listImages) ?? [];
  const getUploadUrl = useMutation(api.images.generateUploadUrl);
  const saveImage = useMutation(api.images.saveImage);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // 1. generate upload URL
    const uploadUrl = await getUploadUrl();

    // 2. upload file directly to Convex storage
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": selectedFile.type,
      },
      body: selectedFile,
    });

    const { storageId } = await response.json();

    // 3. save metadata
    await saveImage({
      name: selectedFile.name,
      storageId,
    });

    // reset input
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📂 Image Upload Test</h1>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>

      <div style={{ marginTop: "20px" }}>
        {listImgs.map((img) => (
          <div key={img._id} style={{ marginBottom: "10px" }}>
            <p>{img.name}</p>
            {img.url && (
              <img
                src={img.url}
                alt={img.name}
                style={{ width: "200px", border: "1px solid #ccc" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
