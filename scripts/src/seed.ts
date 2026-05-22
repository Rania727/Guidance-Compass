import { db, majorsTable, careersTable } from "@workspace/db";
import { seedMajors, seedCareers } from "../../artifacts/api-server/src/lib/seed-data";

async function seed() {
  console.log("Seeding majors...");
  for (const major of seedMajors) {
    await db.insert(majorsTable).values(major).onConflictDoNothing();
  }
  console.log(`Seeded ${seedMajors.length} majors`);

  console.log("Seeding careers...");
  for (const career of seedCareers) {
    await db.insert(careersTable).values(career).onConflictDoNothing();
  }
  console.log(`Seeded ${seedCareers.length} careers`);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
