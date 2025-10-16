import { DataSource, In } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    console.log(`-------- Start UserSeeder --------`);

    const admin = await dataSource.manager.findOneBy(User, {
      username: In(['admin.a']),
    });

    if (!admin) {
      const adminRole = new Role();
      adminRole.name = 'admin';
      await dataSource.manager.save(adminRole);

      console.log(`Creating Admin ...`);
      const userId = '800efe5e-ac25-4608-ac88-4f967d9fcbba';
      const admin = new User();
      admin.id = userId;
      admin.username = 'admin.a';
      admin.email = 'admin.a@origin.co.th';
      admin.employeeId = 'ORI1090001';
      admin.firstnameThai = 'admin';
      admin.lastnameThai = 'admin';
      admin.firstnameEng = 'admin';
      admin.lastnameEng = 'admin';
      admin.roles = [adminRole];
      admin.createdBy = userId;
      admin.updatedBy = userId;

      await dataSource.manager.save(admin);
    } else {
      console.log(`Admin is already exists`);
    }

    console.log(`-------- End UserSeeder --------\n`);
  }
}
