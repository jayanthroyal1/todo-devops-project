const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const s3 = require("../config/s3");
const { AWS_S3_BUCKET_NAME, AWS_REGION } = require("../config/env");

const uploadFile = async (req, res) => {
  try {
    if (!req && !req.file) {
      return res.status(400).json({ message: "No file Uploaded" });
    }
    const fileKey = `todo/${uuidv4()}-${req.file.originalname}`;
    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3.send(command);

    const fileUrl = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileKey}`;

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl,
      fileName: req.file.originalname,
    });
  } catch (err) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

module.exports = { uploadFile };
