import { IReminderRuleService } from '@/services';
import { IReminderRuleController } from '../interfaces';
import { Request, Response } from 'express';
import { createReminderRuleSchema } from '@/schemas';

export class ReminderRuleController implements IReminderRuleController {
  constructor(private _service: IReminderRuleService) {}

  async create(req: Request, res: Response): Promise<void> {
    const validation = createReminderRuleSchema.safeParse(req.body);

    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || 'Invalid input';
      res.status(400).json({ error: errorMessage });
      return;
    }

    const createdRule = await this._service.create(validation.data);
    res.status(201).json(createdRule);
  }
}
