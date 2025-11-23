// components/ProfileUpload.tsx
'use client'; 

import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the expected structure for a successful API response
interface UploadResponse {
  message: string;
  filePath: string;
  fileName: string;
}

export default function ProfileUpload() {
    // State to hold the selected file. Can be a File object or null.
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handles file selection from the input field.
     * @param event The ChangeEvent from the input element.
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage('');
        // Check if files were selected and take the first one
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    /**
     * Handles the form submission and file upload.
     * @param event The FormEvent from the form element.
     */
    const handleUpload = async (event: FormEvent) => {
        event.preventDefault();
        
        if (!selectedFile) {
            setMessage('Please select a file first!');
            return;
        }

        setLoading(true);
        setMessage('Uploading...');

        // 1. Create FormData object
        const formData = new FormData();
        // The key 'profileImage' must match the field name in the Multer config
        formData.append('profileImage', selectedFile);

        try {
            // 2. Send request to the backend
            const response = await fetch('http://localhost:5000/api/profile/upload', {
                method: 'POST',
                // Important: Do NOT set Content-Type header when using FormData with fetch.
                body: formData,
            });

            // 3. Process the response
            const data: UploadResponse = await response.json();

            if (response.ok) {
                setMessage(`Upload Successful! File saved as: ${data.fileName}`);
                // TODO: Update user state/database with data.filePath
            } else {
                // Assuming the backend sends an { error: string } for failures
                const errorData = data as unknown as { error: string }; 
                setMessage(`Upload Failed: ${errorData.error || 'Unknown server error'}`);
            }
        } catch (error) {
            // Type assertion for network error objects
            setMessage(`Network Error: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Upload Profile Picture (TSX)</h3>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    name="profileImage"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleFileChange}
                />
                <button type="submit" disabled={!selectedFile || loading} style={{ marginLeft: '10px' }}>
                    {loading ? 'Processing...' : 'Upload Image'}
                </button>
            </form>
            
            <p style={{ 
                marginTop: '15px', 
                fontWeight: 'bold',
                color: message.includes('Successful') ? 'green' : message.includes('Uploading') ? 'blue' : 'red' 
            }}>
                {message}
            </p>

            {selectedFile && (
                <p>
                    **File Ready:** {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
            )}
        </div>
    );
}