const z = require("zod");

// Register Validation
const registerValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),

  email: z.string().email("Invalid Email Format").trim().toLowerCase(),

  phone: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Invalid Phone Number")
    .trim()
    .optional(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters")
    .trim(),

  role: z.enum(["user", "vendor"], "Invalid Role").optional().default("user"),
});

// Login Validation
const loginValidationSchema = z.object({
  email: z.string().email("Invalid Email Format").trim().toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters")
    .trim(),
});

module.exports = { registerValidationSchema, loginValidationSchema };
