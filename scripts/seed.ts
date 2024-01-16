const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.Catagory.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Software Engineering" },
        { name: "Electrical Engineering" },
        { name: "Mechanical Engineering" },
        { name: "Civil Engineering" },
        { name: "Photography" },
        { name: "Music" },
        { name: "Art" },
        { name: "Business" },
      ],
    });
    console.log("Seeding to the db catagory", "Success");
  } catch (error) {
    console.log("Error Seeding to the db catagory", error);
  } finally {
    await database.$disconnect();
  }
}

main();
