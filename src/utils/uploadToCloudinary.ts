import { cloudinaryAxiosInstance } from "../config/axios";
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
}
const uploadFileToCloudinary = async (
  file: any,
  folder: string
): Promise<CloudinaryUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);
  formData.append("folder", folder);

  try {
    const response = await cloudinaryAxiosInstance.post(
      "/upload",
      formData,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("File upload failed");
  }
};

export { uploadFileToCloudinary };
