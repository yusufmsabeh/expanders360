import { User } from '../../user/user.entity';
import { Project } from '../../project/project.entity';
import { Vendor } from '../../vendor/vendor.entity';
import { Match } from '../../match/match.entity';
import RoleEnum from '../../user/role.enum';
import datasrouceConfig from '../../config/datasrouce.config';

const AppDataSource = datasrouceConfig;

const getRandomDateLast30Days = (): Date => {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const randomTimestamp =
    thirtyDaysAgo.getTime() +
    Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
  return new Date(randomTimestamp);
};

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    // Clear existing data to ensure a fresh start.
    // The correct order is to clear child tables first, then parent tables.
    console.log('Clearing old data...');
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0;');

    await AppDataSource.getRepository(Match).clear(); // Clear matches first
    await AppDataSource.getRepository(Project).clear(); // Then projects
    await AppDataSource.getRepository(Vendor).clear(); // Then vendors
    await AppDataSource.getRepository(User).clear(); // Finally users

    console.log('Old data cleared.');

    // Step 1: Create sample users with different roles
    const users: User[] = [];
    for (let i = 0; i < 5; i++) {
      const user = new User();
      user.companyName = `User Company ${i + 1}`;
      user.contactEmail = `user${i + 1}@email.com`;
      user.password =
        '$2b$10$xR7A.rUIuuJmfKBOwuAdFuYEIB5vlaf9srNsN/Z5p3ygt0cKH/94.'; // In a real app, you would hash this
      user.role = i % 2 === 0 ? RoleEnum.admin : RoleEnum.client;
      users.push(await AppDataSource.manager.save(user));
    }
    console.log('Users created.');

    // Step 2: Create sample vendors with diverse countriesSupported arrays
    const vendorCountries = [
      'USA',
      'Germany',
      'Japan',
      'Brazil',
      'India',
      'Canada',
    ];
    const services = [
      'AI Integration',
      'API Development',
      'Frontend',
      'Mobile App',
    ];
    const vendors: Vendor[] = [];
    for (let i = 0; i < 10; i++) {
      const vendor = new Vendor();
      vendor.name = `Vendor ${i + 1}`;
      vendor.rating = Math.floor(Math.random() * 5) + 1;
      vendor.responseSLAHours = Math.floor(Math.random() * 24) + 1;
      vendor.countriesSupported = vendorCountries
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);
      vendor.servicesOffered = services
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);
      vendors.push(await AppDataSource.manager.save(vendor));
    }
    console.log('Vendors created.');

    // Step 3: Create projects and matches for the last 30 days
    console.log('Creating projects and matches...');
    for (let i = 0; i < 50; i++) {
      const project = new Project();
      project.user = users[Math.floor(Math.random() * users.length)];
      project.title = `Project Title ${i + 1}`;
      project.country =
        vendorCountries[Math.floor(Math.random() * vendorCountries.length)];
      project.servicesNeeded = services
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 1);
      project.budget = Math.floor(Math.random() * 50000) + 10000;
      project.status = 'active';
      await AppDataSource.manager.save(project);
    }
    console.log('Seeding finished successfully!');
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    await AppDataSource.destroy();
    console.log('Data Source has been closed.');
  }
};

seedDatabase();
