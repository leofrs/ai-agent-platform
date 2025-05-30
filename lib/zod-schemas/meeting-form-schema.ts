import * as zod from "zod";

export const meetingFormSchema = zod
  .object({
    title: zod.string(),
    agent: zod.string(),
  })
  .required();
