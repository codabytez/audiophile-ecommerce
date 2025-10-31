import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    // Billing Details
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),

    // Shipping Info
    address: z.string().min(5, "Address must be at least 5 characters"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
    city: z.string().min(2, "City must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),

    // Payment Method
    paymentMethod: z.enum(["e-money", "cash"]).default("e-money"),

    // E-Money (conditional)
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "e-money") {
        return data.eMoneyNumber && data.eMoneyPin;
      }
      return true;
    },
    {
      message: "E-Money details are required",
      path: ["eMoneyNumber"],
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
