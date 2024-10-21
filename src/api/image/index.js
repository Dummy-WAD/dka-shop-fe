import axiosInstance from "../../utils/axios";

const getPresignedURLs = (filenames) => {
  return axiosInstance.post(`/images/generate-presigned-urls`, {
    keys: filenames,
  });
}

const uploadImageToS3 = (presignedURL, file) => {
  return axiosInstance.put(presignedURL, file);
}

const uploadImagesToS3 = (presignedURLs, files) => {
  return Promise.allSettled(
    presignedURLs.map((presignedURL, index) => uploadImageToS3(presignedURL, files[index]))
  );
}

export { getPresignedURLs, uploadImagesToS3 }