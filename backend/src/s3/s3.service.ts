import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  S3Client,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly logger = new Logger(S3Service.name);

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadToS3(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}_${file.originalname}`;
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

    try {
      const parallelUpload = new Upload({
        client: this.s3,
        params: {
          Bucket: bucketName,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });

      await parallelUpload.done();

      const cloudFrontUrl = `${this.configService.get<string>('CLOUDFRONT_URL')}/${fileName}`;
      return cloudFrontUrl;
    } catch (error) {
      this.logger.error(`Error uploading file to S3: ${error.message}`);
      throw new Error(`S3 upload failed: ${error.message}`);
    }
  }

  async uploadsingleimagetos3(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}_${file.originalname}`;
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    if (!file.buffer) {
      throw new Error('File buffer is empty');
    }
    try {
      const parallelUpload = new Upload({
        client: this.s3,
        params: {
          Bucket: bucketName,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });

      await parallelUpload.done();

      const cloudFrontUrl = `${this.configService.get<string>('CLOUDFRONT_URL')}/${fileName}`;
      return cloudFrontUrl;
    } catch (error) {
      this.logger.error(`Error uploading file to S3: ${error.message}`);
      throw new Error(`S3 upload failed: ${error.message}`);
    }
  }

  //delete function

  async deletesingleimagefroms3(fileUrl: string): Promise<void> {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const fileName = fileUrl.split('/').pop();

    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      });

      await this.s3.send(deleteCommand);
      this.logger.log(`Successfully deleted image: ${fileName}`);
    } catch (error) {
      this.logger.error(`Error deleting file from S3: ${error.message}`);
      throw new Error(`S3 deletion failed: ${error.message}`);
    }
  }

  async deleteFromS3(fileKey: string): Promise<void> {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

    try {
      // Check if the file exists before attempting to delete
      await this.s3.send(
        new HeadObjectCommand({ Bucket: bucketName, Key: fileKey }),
      );

      await this.s3.send(
        new DeleteObjectCommand({ Bucket: bucketName, Key: fileKey }),
      );
    } catch (error) {
      if (error.name === 'NotFound') {
        throw new NotFoundException(`File ${fileKey} not found in S3 bucket`);
      }
      this.logger.error(`Error deleting file from S3: ${error.message}`);
      throw new Error(`S3 delete failed: ${error.message}`);
    }
  }

  extractKeyFromUrl(url: string): string {
    const cloudFrontUrl = this.configService.get<string>('CLOUDFRONT_URL');
    return url.replace(`${cloudFrontUrl}/`, '');
  }
}
