import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
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
    const extension = fileName.split('.').pop();
    const filePath = `${fileFolder}/${fileId}.${extension}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: filePath,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      const fileUrl = await this.getSignedUrl(this.bucketName, filePath);

      return {
        fileId,
        fileName,
        filePath,
        fileBucket: this.bucketName,
        fileUrl,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async getSignedUrl(
    bucket: string = this.bucketName,
    name: string,
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: name,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
      });

      return url;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e);
    }
  }
}
