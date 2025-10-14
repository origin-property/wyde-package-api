import { Public } from '@/shared/decorators/public.decorator';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    data: { fileId: string; fileFolder: string; fileName: string },
  ) {
    return this.uploadService.upload(
      file,
      data.fileFolder,
      data.fileId,
      data.fileName,
    );
  }
}
