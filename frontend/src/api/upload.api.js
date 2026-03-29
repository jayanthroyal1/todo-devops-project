import api from "./axios";

export const uploadFileApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const uploadMultipleFilesApi = async (files = []) => {
  const uploadedFiles = [];

  for (const file of files) {
    const uploaded = await uploadFileApi(file);
    uploadedFiles.push(uploaded);
  }

  return uploadedFiles;
};
