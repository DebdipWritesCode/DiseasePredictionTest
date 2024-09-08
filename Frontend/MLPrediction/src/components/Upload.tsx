import React, { useRef } from 'react';
import axios from 'axios';

interface UploadProps {
  setImage: (fileUrl: string) => void;
  setResult: (result: any) => void;
  setLoading: (loading: boolean) => void;
}

const Upload: React.FC<UploadProps> = ({ setImage, setResult, setLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);

      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setResult(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="bg-white p-10 h-[150px] mx-[80px] rounded-xl flex justify-center items-center flex-col gap-2 shadow-2xl">
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <button
        className="bg-[#2FA56B] py-4 px-20 rounded-3xl text-white font-poppins font-semibold text-4xl"
        onClick={handleButtonClick}
      >
        Upload Image
      </button>

      <p className="text-red-600 font-semibold">
        *Only .jpg and .png formats are acceptable
      </p>
    </div>
  );
};

export default Upload;
