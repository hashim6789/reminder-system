import { IReminderRuleService } from '@/services';
import { IReminderRuleController } from '../interfaces';
import { Request, Response } from 'express';
import {
  createReminderRuleSchema,
  idSchema,
  toggleReminderRuleSchema,
  updateReminderRuleSchema,
} from '@/schemas';

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

  async getAll(req: Request, res: Response): Promise<void> {
    const reminderRules = await this._service.getAll();

    res.status(200).json(reminderRules);
  }

  async toggleActive(req: Request, res: Response): Promise<void> {
    const bodyValidation = toggleReminderRuleSchema.safeParse(req.body);
    const paramsValidation = idSchema.safeParse(req.params);

    if (!bodyValidation.success) {
      const errorMessage = bodyValidation.error.errors[0]?.message || 'Invalid input';

      res.status(400).json({ error: errorMessage });
      return;
    }
    if (!paramsValidation.success) {
      const errorMessage = paramsValidation.error.errors[0]?.message || 'Invalid input';

      res.status(400).json({ error: errorMessage });
      return;
    }

    const updatedRule = await this._service.toggleActive(
      paramsValidation.data.id,
      bodyValidation.data.isActive,
    );

    res.status(200).json(updatedRule);
  }

  async update(req: Request, res: Response): Promise<void> {
    const bodyValidation = updateReminderRuleSchema.safeParse(req.body);
    const paramsValidation = idSchema.safeParse(req.params);

    if (!bodyValidation.success) {
      const errorMessage = bodyValidation.error.errors[0]?.message || 'Invalid input';

      res.status(400).json({ error: errorMessage });
      return;
    }
    if (!paramsValidation.success) {
      const errorMessage = paramsValidation.error.errors[0]?.message || 'Invalid input';

      res.status(400).json({ error: errorMessage });
      return;
    }

    const updatedRule = await this._service.update(paramsValidation.data.id, bodyValidation.data);

    res.status(200).json(updatedRule);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const paramsValidation = idSchema.safeParse(req.params);

    if (!paramsValidation.success) {
      const errorMessage = paramsValidation.error.errors[0]?.message || 'Invalid input';

      res.status(400).json({ error: errorMessage });
      return;
    }

    const updatedRule = await this._service.delete(paramsValidation.data.id);

    res.status(200).json(updatedRule);
  }
}
