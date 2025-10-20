import { CurrentUser } from '@/shared/decorators/decorators';
import { UploadService } from '@/upload/upload.service';
import { User } from '@/users/entities/user.entity';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateFileInput } from './input/create-file.input';
import { UpdateFileInput } from './input/update-file.input';
import { File } from './dto/file.dto';
import { FilesService } from './files.service';

@Resolver(() => File)
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService,
    private readonly uploadService: UploadService,
  ) {}

  @Mutation(() => File)
  async createFile(
    @Args('createFileInput') createFileInput: CreateFileInput,
    @CurrentUser() user: User,
  ) {
    return this.filesService.create(createFileInput, user.id);
  }

  @Query(() => [File], { name: 'files' })
  async findAll() {
    return this.filesService.findAll();
  }

  @Query(() => File, { name: 'file' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.filesService.findOne(id);
  }

  @Mutation(() => File)
  async createOrUpdateModelFile(
    @Args('createFileInput')
    createFileInput: CreateFileInput,
    @CurrentUser() user: User,
  ) {
    return this.filesService.createOrUpdateModelFile(
      createFileInput.fileName,
      createFileInput.filePath,
      createFileInput.refId,
      createFileInput.projectId,
      user.id,
    );
  }

  @Mutation(() => File)
  async updateFile(
    @Args('updateFileInput') updateFileInput: UpdateFileInput,
    @CurrentUser() user: User,
  ) {
    return this.filesService.update(
      updateFileInput.id,
      updateFileInput,
      user.id,
    );
  }

  @Mutation(() => Boolean)
  async removeFile(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.filesService.remove(id, user.id);
  }

  @ResolveField(() => String, { name: 'fileUrl' })
  async url(@Parent() { filePath, fileBucket }: File) {
    return this.uploadService.getSignedUrl(fileBucket, filePath);
  }
}
