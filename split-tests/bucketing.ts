import { crc32 } from "@getkoala/crc32";
import { v4 as uuidv4 } from "uuid";

function bucket(userId: string, size: number) {
  return crc32(userId) % 2;
}

// Koala IDs are always UUIDs. So we'll simulate them here
const id = () => uuidv4();

console.log({ b1: bucket(id(), 2) });
console.log({ b2: bucket(id(), 2) });
console.log({ b3: bucket(id(), 2) });
console.log({ b4: bucket(id(), 2) });
