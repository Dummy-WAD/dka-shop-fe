import axiosInstance from "../../utils/axios";

const getPresignedURLs = (filenames) => {
  return axiosInstance.post(`/admin/images/generate-presigned-urls`, {
    keys: filenames,
  });
}

const uploadImageToS3 = (presignedURL, file) => {
  return fetch(presignedURL, {
    method: "PUT",
    body: file
  })
}

const uploadImagesToS3 = (presignedURLs, files) => {
  return Promise.allSettled(
    presignedURLs.map((presignedURL, index) => uploadImageToS3(presignedURL, files[index]))
  );
}

export { getPresignedURLs, uploadImagesToS3 }