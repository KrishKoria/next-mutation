import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: process.env.AWS_REGION,
});

export default async function uploadImage(image) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const bufferData = Buffer.from(imageData);
  const fileName = "image-" + Date.now().toString();
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: bufferData,
    ContentType: mime,
  };
  await s3.putObject(uploadParams);
  const imageUrl = `${process.env.AWS_BASE_URL}/${fileName}`;
  return imageUrl;
}
