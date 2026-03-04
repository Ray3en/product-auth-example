import { z } from "zod";

export const loginSchema = z
  .object({
    // email: z.string({ message: "Почта обязательна" }).email({message: 'Некорректная почта'}),
    email: z.string({ message: "Почта обязательна" }).min(1, "Почта обязательна"),
    password: z.string({ message: "Пароль обязателен" }).min(8, "Пароль должен содержать не менее 8 символов"),
  })

export type LoginFormData = z.infer<typeof loginSchema>;
