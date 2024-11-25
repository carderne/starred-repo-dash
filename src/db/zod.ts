import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import * as schema from "./schema";

export const insertUser = createInsertSchema(schema.users);
export const selectUser = createSelectSchema(schema.users);
export type User = z.infer<typeof selectUser>;

export const insertMember = createInsertSchema(schema.members);
export const selectMember = createSelectSchema(schema.members);
export type Member = z.infer<typeof selectMember>;

export const insertCompany = createInsertSchema(schema.companies);
export const selectCompany = createSelectSchema(schema.companies);
export type Company = z.infer<typeof selectCompany>;

export const insertThread = createInsertSchema(schema.threads);
export const selectThread = createSelectSchema(schema.threads);
export type Thread = z.infer<typeof selectThread>;

export const insertPost = createInsertSchema(schema.posts);
export const selectPost = createSelectSchema(schema.posts);
export type Post = z.infer<typeof selectPost>;

export const insertEvent = createInsertSchema(schema.events);
export const selectEvent = createSelectSchema(schema.events);
export type Event = z.infer<typeof selectEvent>;
