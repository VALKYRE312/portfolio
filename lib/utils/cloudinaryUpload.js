import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = (fileBuffer, folder = 'portfolio') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const uploadMultipleToCloudinary = async (files, folder = 'portfolio') => {
  const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer, folder));
  return Promise.all(uploadPromises);
};
