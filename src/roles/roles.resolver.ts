import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  async findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  async updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Boolean)
  async removeRole(@Args('id', { type: () => ID }) id: string) {
    return this.rolesService.remove(id);
  }
}
