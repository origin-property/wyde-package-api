import { UploadService } from '@/upload/upload.service';
import { Args, ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductVariantImageModel } from './dto/productVariantImage.dto';
import { ProductVariantImagesService } from './product-variant-images.service';

@Resolver(() => ProductVariantImageModel)
export class ProductVariantImagesResolver {
  constructor(
    private readonly productVariantImagesService: ProductVariantImagesService,
    private readonly uploadService: UploadService,
  ) {}

  @ResolveField(() => [ProductVariantImageModel], {
    name: 'productVariantImages',
  })
  async findAll(
    @Args('productVariantId', { type: () => String }) productVariantId: string,
  ) {
    return this.productVariantImagesService.findAll(productVariantId);
  }

  @ResolveField(() => ProductVariantImageModel, { name: 'productVariantImage' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.productVariantImagesService.findOne(id);
  }

  @ResolveField(() => String, { name: 'fileUrl' })
  async fileUrl(@Parent() { filePath, fileBucket }: ProductVariantImageModel) {
    return this.uploadService.getSignedUrl(fileBucket, filePath);
  }
}
