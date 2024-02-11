import { faker } from '@faker-js/faker';
import prisma from '../../prisma/client';

async function main() {
  faker.seed(1);
  await seedDevData();
}

async function seedDevData() {
  const tracks = [...Array(10).keys()].map(() => ({
    id: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    name: faker.music.songName(),
    artistName: faker.person.fullName(),
    duration: faker.number.int({ max: 1000000 }),
    releaseDate: faker.date.soon(),
    isrc: faker.string.alphanumeric({ length: 12, casing: 'upper' }),
  }));

  console.log('Saved tracks seed', tracks);
  await prisma.track.createMany({
    data: tracks,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error('Error during seeding process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
