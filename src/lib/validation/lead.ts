import { z } from "zod";
import { sanitizePlainText } from "@/lib/plain-text";

export const interestEnum = z.enum([
  "tefillin",
  "mezuzot",
  "megillot",
  "sefer-torah",
  "pitum",
  "general",
]);

/** Israeli mobile: 05X-XXXXXXX after normalization */
export function normalizeIlPhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  let d = digits.replace(/^\+/, "");
  if (d.startsWith("972")) d = `0${d.slice(3)}`;
  if (d.startsWith("9720")) d = d.slice(3);
  return d;
}

export function isValidIlMobile(raw: string): boolean {
  const n = normalizeIlPhone(raw);
  return /^05\d{8}$/.test(n);
}

const optionalEmail = z
  .string()
  .trim()
  .max(120)
  .refine(
    (v) => v.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    { message: "email" },
  )
  .transform((v) => (v.length === 0 ? undefined : v))
  .optional();

export const leadSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "name")
      .max(80, "name")
      .transform((v) => sanitizePlainText(v, 80)),
    phone: z
      .string()
      .trim()
      .min(9, "phone")
      .max(20, "phone")
      .refine((v) => isValidIlMobile(v), { message: "phone" }),
    email: optionalEmail,
    interest: interestEnum.default("general"),
    secondaryInterest: interestEnum.optional().nullable(),
    locale: z.enum(["he", "en"]),
    turnstileToken: z.string().max(8192).optional(),
    /** Honeypot — must stay empty */
    companyWebsite: z.string().max(200).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if ((data.companyWebsite ?? "").trim().length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["companyWebsite"],
        message: "bot",
      });
    }
    if (
      data.secondaryInterest != null &&
      data.secondaryInterest === data.interest
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["secondaryInterest"],
        message: "secondaryInterest",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
