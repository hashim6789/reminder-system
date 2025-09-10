import { z } from 'zod';

export const createReminderRuleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  minutesBefore: z.number().int().min(1, 'Must be at least 1 minute'),
  taskId: z.string().uuid('Invalid task ID'),
});

export type CreateReminderRuleDTO = z.infer<typeof createReminderRuleSchema>;

export const idSchema = z.object({
  id: z.string().uuid('Invalid reminder rule ID'),
});
export const toggleReminderRuleSchema = z.object({
  isActive: z.boolean(),
});

export type ToggleReminderRuleDTO = z.infer<typeof toggleReminderRuleSchema>;

export type UpdateReminderRuleDTO = z.infer<typeof createReminderRuleSchema>;

export type IdDTO = z.infer<typeof idSchema>;
