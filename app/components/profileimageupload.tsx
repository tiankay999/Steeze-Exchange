// components/ProfileUpload.tsx
'use client';

import React, { useState, ChangeEvent, useRef } from 'react';
import { User, Camera } from 'lucide-react';

// Define the expected structure for a successful API response
interface UploadResponse {
    message: string;
    filePath: string;
    fileName: string;
}

export default function ProfileUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Handles file selection and creates a preview
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Auto-upload when file is selected
            uploadFile(file);
        }
    };

    /**
     * Handles the file upload
     */
    const uploadFile = async (file: File) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-upload`, {
                method: 'POST',
                body: formData,
            });

            const data: UploadResponse = await response.json();

            if (response.ok) {
                console.log('Upload successful:', data.fileName);
                // TODO: Update user state/database with data.filePath
            } else {
                const errorData = data as unknown as { error: string };
                console.error('Upload failed:', errorData.error);
                // Reset on error
                setPreviewUrl(null);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Network error:', (error as Error).message);
            // Reset on error
            setPreviewUrl(null);
            setSelectedFile(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Triggers the file input click
     */
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative w-full h-full group cursor-pointer" onClick={handleClick}>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                name="profileImage"
                accept="image/png, image/jpeg, image/gif, image/webp"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Profile Image or Default Icon */}
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                />
            ) : (
                <User className="w-full h-full text-white p-4" />
            )}

            {/* Camera Overlay - appears on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {loading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                ) : (
                    <Camera className="w-8 h-8 text-white" />
                )}
            </div>
        </div>
    );
}