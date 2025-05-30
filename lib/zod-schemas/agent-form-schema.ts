import * as zod from "zod";

export const agentFormSchema = zod
  .object({
    name: zod.string(),
    instructions: zod.string(),
  })
  .required();
