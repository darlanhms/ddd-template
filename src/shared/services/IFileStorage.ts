export interface UploadImagePayload {
    pathname: string;
    /**
     * Raw base64 or ready to use Buffer
     */
    body: string | Buffer;
    /**
     * File extension
     * @note will be added in the pathname as .<ext>
     */
    ext: string;
    /**
     * File encondig
     *
     * @default "base64"
     */
    encoding?: BufferEncoding;
}

export default interface IFileStorage {
    uploadImage(payload: UploadImagePayload): Promise<void>;
    deleteFile(pathname: string): Promise<void>;
}
