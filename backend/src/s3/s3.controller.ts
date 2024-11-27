import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Body,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('img')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('my_files', 5))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
          new FileTypeValidator({ fileType: /^image\/(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    try {
      const uploadPromises = files.map((file) =>
        this.s3Service.uploadToS3(file),
      );
      const uploadedFiles = await Promise.all(uploadPromises);
      return { urls: uploadedFiles };
    } catch (error) {
      throw new InternalServerErrorException(
        `File upload failed: ${error.message}`,
      );
    }
  }

  @Post('uploadSingleImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadsinglefile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB limit
          new FileTypeValidator({ fileType: /^image\/(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('oldImageUrl') oldImageUrl: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    try {
      if (oldImageUrl) {
        await this.s3Service.deletesingleimagefroms3(oldImageUrl);
      }
      const uploadfileurl = await this.s3Service.uploadsingleimagetos3(file);
      return { url: uploadfileurl };
    } catch (error) {
      throw new InternalServerErrorException(
        `File upload failed: ${error.message}`,
      );
    }
  }

  @Post('uploadpdf')
  @UseInterceptors(FileInterceptor('file'))
  async uploadpdf(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), 
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const url = await this.s3Service.uploadpdftos3(file);
      return url;
    } catch (error) {
      throw new InternalServerErrorException(
        `File upload failed: ${error.message}`,
      );
    }
  }

  @Delete('delete')
  async deleteFile(@Body('fileUrl') fileUrl: string) {
    if (!fileUrl) {
      throw new BadRequestException('File URL is required');
    }

    try {
      const fileKey = this.s3Service.extractKeyFromUrl(fileUrl);
      await this.s3Service.deleteFromS3(fileKey);
      return { message: 'File deleted successfully', status: HttpStatus.OK };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        `File deletion failed: ${error.message}`,
      );
    }
  }
}
