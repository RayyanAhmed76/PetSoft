import z, { email } from "zod";
import { defautPetImage } from "./constant-image-pet";

export const petIdSchema = z.string().cuid();

export const petformvalidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "min length should be 1 character" })
      .max(50, { message: "max length should be less than 50" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "min length should be 1 character" })
      .max(50, { message: "max length should be less than 50" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Not a valid image url" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive()
      .max(150)
      .min(1, { message: "minimum age should be atleast 1" }),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(500, { message: "exceeded the limit > 500" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || defautPetImage,
  }));

export type TpetForm = z.infer<typeof petformvalidation>;

export const authformschema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100).min(5),
});
