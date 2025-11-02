import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.todo.createMany({
      data: Array.from({ length: 30 }, () => ({
          title: faker.lorem.text(),
          body: faker.lorem.paragraph(),
          completed: faker.datatype.boolean(),
      
            }),
      ),
    })                          

}
main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })