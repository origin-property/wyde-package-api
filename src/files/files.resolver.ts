import { CurrentUser } from '@/shared/decorators/decorators';
import { User } from '@/users/entities/user.entity';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { File } from './entities/file.entity';
import { FilesService } from './files.service';

@Resolver(() => File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

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
}
