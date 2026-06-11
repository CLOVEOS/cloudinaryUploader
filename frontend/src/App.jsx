import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setUploadedUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); 

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadedUrl(data.url_path); // 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px" }}>
      <h2>Upload to Cloudinary</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ margin: "1rem 0" }}>
          <p>Preview:</p>
          <img src={preview} alt="preview" width={200} />
        </div>
      )}

      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {uploadedUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Uploaded!</p>
          <img src={uploadedUrl} alt="uploaded" width={200} />
          <p>
            <a href={uploadedUrl} target="_blank" rel="noreferrer">
              Open on Cloudinary
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
