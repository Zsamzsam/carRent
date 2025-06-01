import { faker } from '@faker-js/faker';
import { PrismaClient, cars } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){

    const cars : cars[] = await prisma.cars.findMany()

    for(let i = 0; i < 15; i++){
        await prisma.rentals.create({
            data:{
                car_id: faker.helpers.arrayElement(cars).id,
                strat_date: faker.date.past(),
                end_date: faker.date.soon()
            }
        })
    }
        
}

main()
    .catch(e => {
        console.error(e)
        process.exit()
    })
    .finally(async () =>{
        await prisma.$disconnect()
    })
