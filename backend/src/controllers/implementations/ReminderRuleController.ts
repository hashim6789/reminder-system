import { IReminderRuleService } from '@/services';
import { IReminderRuleController } from '../interfaces';
import { Request, Response } from 'express';
import { createReminderRuleSchema, idSchema, toggleReminderRuleSchema } from '@/schemas';
import { HttpStatus, ReminderMessages } from '@/constants';

export class ReminderRuleController implements IReminderRuleController {
  constructor(private _service: IReminderRuleService) {}

  async create(req: Request, res: Response): Promise<void> {
    const validation = createReminderRuleSchema.safeParse(req.body);

    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || ReminderMessages.INVALID_INPUT;
      res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
      return;
    }

    const createdRule = await this._service.create(validation.data);
    res.status(HttpStatus.CREATED).json(createdRule);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const reminderRules = await this._service.getAll();
    res.status(HttpStatus.OK).json(reminderRules);
  }

  async toggleActive(req: Request, res: Response): Promise<void> {
    const bodyValidation = toggleReminderRuleSchema.safeParse(req.body);
    const paramsValidation = idSchema.safeParse(req.params);

    if (!bodyValidation.success) {
      const errorMessage =
        bodyValidation.error.errors[0]?.message || ReminderMessages.INVALID_INPUT;
      res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
      return;
    }

    if (!paramsValidation.success) {
      const errorMessage =
        paramsValidation.error.errors[0]?.message || ReminderMessages.INVALID_INPUT;
      res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
      return;
    }

    const updatedRule = await this._service.toggleActive(
      paramsValidation.data.id,
      bodyValidation.data.isActive,
    );

    res.status(HttpStatus.OK).json(updatedRule);
  }

  async update(req: Request, res: Response): Promise<void> {
    const bodyValidation = createReminderRuleSchema.safeParse(req.body);
    const paramsValidation = idSchema.safeParse(req.params);

    if (!bodyValidation.success) {
      const errorMessage =
        bodyValidation.error.errors[0]?.message || ReminderMessages.INVALID_INPUT;
      res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
      return;
    }

    if (!paramsValidation.success) {
      const errorMessage =
        paramsValidation.error.errors[0]?.message || ReminderMessages.INVALID_INPUT;
      res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
      return;
    }

    const updatedRule = await this._service.update(paramsValidation.data.id, bodyValidation.data);
    res.status(HttpStatus.OK).json(updatedRule);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const paramsValidation = idSchema.safeParse(req.params);

    if (!paramsValidation.success) {
      const errorMessage =
        paramsValidation.error.errors[0]?.message || ReminderMessages.INVALID_INPUT;
      res.status(HttpStatus.BAD_REQUEST).json({ error: errorMessage });
      return;
    }

    await this._service.delete(paramsValidation.data.id);
    res.status(HttpStatus.OK).json({ success: true });
  }
}
