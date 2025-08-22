import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

// Prevent multiple instances of Prisma Client in development due to hot module reloading
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
