import { useState } from 'react';
import { sendFile } from '../api/api.js';

function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        await uploadFile(file)
    };

    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        await sendFile(formData)

        console.log("File Uploaded")
        console.log(formData)
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <label
                    htmlFor="file_input"
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                >
                    Upload File
                </label>
                <input
                    id="file_input"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
}

export default FileUploader;