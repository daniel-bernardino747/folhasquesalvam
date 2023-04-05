import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CLERK_ID = process.env.CLERK_ID;
const CLERK_EMAIL = process.env.CLERK_EMAIL;

async function main() {
  const [volunteers] = await createTeams();
  console.log('🌱 created teams: GTV, GTP, embassadors I/24, alumni');

  const user = await createYourUser(volunteers.id);
  console.log(`🌱 created your user with id: ${user.id}`);
}

async function createYourUser(teamId: number) {
  return prisma.user.upsert({
    where: { idClerk: CLERK_ID },
    update: {},
    create: {
      idClerk: CLERK_ID,
      email: CLERK_EMAIL,
      Member: {
        create: [{ teamId }],
      },
    },
  });
}

async function createTeams() {
  return Promise.all([
    await prisma.team.upsert({
      where: {
        name: 'Grupo de Trabalho para Voluntários',
      },
      update: {},
      create: {
        name: 'Grupo de Trabalho para Voluntários',
      },
    }),
    await prisma.team.upsert({
      where: {
        name: 'Grupo de Trabalho para Parceiros',
      },
      update: {},
      create: {
        name: 'Grupo de Trabalho para Parceiros',
      },
    }),
    await prisma.team.upsert({
      where: {
        name: 'Embaixadores I/24',
      },
      update: {},
      create: {
        name: 'Embaixadores I/24',
      },
    }),
    await prisma.team.upsert({
      where: {
        name: 'Rede Alumni',
      },
      update: {},
      create: {
        name: 'Rede Alumni',
      },
    }),
  ]);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
