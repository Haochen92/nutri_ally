import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { Blob } from "buffer"

const s3 = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
})

const uploadImageS3 = async (profileId, file) => {

    const bucketName = "liuhaochen92";
    const fileKey= `openfood/profile-image/${profileId}.jpg`;
    const uploadParams = {
        Bucket: bucketName,
        Key:fileKey,
        Body: file,
        ContentType:"image/jpeg",
    }

    try {
        const command = new PutObjectCommand(uploadParams);
        const response = await s3.send(command);
        console.log("File uploaded successfully", response);
        return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
    } catch (error) {
        throw new Error(`Error uploading file at server action: ${error}`);
    }
}

const streamToBlob = async (readableStream, mimeType="image/jpeg") => {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    return new Blob(chunks, { type: mimeType });
}


const downloadImageS3 = async (profileId) => {
    if (!profileId) {
        throw new Error("Invalid input: profileId is required.");
    }
    
    const bucketName = "liuhaochen92";
    const fileKey= `openfood/profile-image/${profileId}.jpg`;
    const downloadParams = {
        Bucket: bucketName,
        Key:fileKey,
    }

    try {
        const command = new GetObjectCommand(downloadParams);
        const response = await s3.send(command);
        const blob = await streamToBlob(response.Body, "image/jpeg")
        return blob
    } catch (error) {
        throw new Error(`Error downloading file: ${error}`);
    }
}

export { uploadImageS3 , downloadImageS3}