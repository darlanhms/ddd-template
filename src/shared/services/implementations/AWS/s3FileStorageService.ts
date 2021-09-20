import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import IFileStorage, { UploadImagePayload } from '@shared/services/IFileStorage';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY || '',
        secretAccessKey: process.env.AWS_SECRET || '',
    },
});

export default class S3FileStorage implements IFileStorage {
    async uploadImage(payload: UploadImagePayload): Promise<void> {
        let body: Buffer;
        const encoding = payload.encoding || 'base64';

        if (typeof payload.body === 'string') {
            body = Buffer.from(payload.body.replace(/^data:image\/\w+;base64,/, ''), encoding);
        } else {
            body = payload.body;
        }

        const putCommand = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: payload.pathname,
            Body: body,
            ContentType: `image/${payload.ext}`,
        });

        await s3Client.send(putCommand).then(console.log);
    }

    async deleteFile(pathname: string): Promise<void> {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: pathname,
        });

        await s3Client.send(deleteCommand);
    }
}
