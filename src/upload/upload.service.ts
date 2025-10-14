import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class UploadService {
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectS3()
    private readonly s3Client: S3,
  ) {
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
  }

  private readonly logger = new Logger(UploadService.name);

  async upload(
    file: Express.Multer.File,
    fileFolder: string,
    fileId: string,
    fileName: string,
  ) {
    const filePath = `${fileFolder}/${fileName}`;

    const command: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: filePath,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(command));

      const fileUrl = await this.getUrl(this.bucketName, filePath);

      return {
        fileId,
        fileName,
        fileFolder,
        filePath,
        fileBucket: this.bucketName,
        fileExtension: file.mimetype.split('/')[1],
        fileUrl,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async getUrl(
    bucket: string = this.bucketName,
    name: string,
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: name,
      });

      const url = await getSignedUrl(this.s3Client, command);

      return url;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e);
    }
  }
}
