const PrismaClient = require('@prisma/client');
const prisma = new PrismaClient.PrismaClient();

export default PrismaClient;

module.exports = {
    prisma
}
