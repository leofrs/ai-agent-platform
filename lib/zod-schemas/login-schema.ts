import * as zod from "zod";

export const loginSchema = zod
  .object({
    email: zod.string().email("Formato de email inválido"),
    password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  })
  .required();
