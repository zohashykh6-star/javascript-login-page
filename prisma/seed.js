const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (existingUser) {
    console.log("✅ User admin@example.com already exists");
    return;
  }

  // Hash password
  const passwordHash = await bcrypt.hash("admin123", 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      fullName: "Admin User",
      email: "admin@example.com",
      passwordHash: passwordHash,
    },
  });

  console.log("✅ Created test user:", user);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
