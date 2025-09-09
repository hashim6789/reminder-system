import express from 'express';
import { reminderRuleRouter } from './reminder-rule.routes';
import { taskRouter } from './task.routes';
// import { auditLogRouter } from './audit-log.routes';

export const apiRouter = express.Router();

apiRouter.use('/reminder-rules', reminderRuleRouter);
apiRouter.use('/tasks', taskRouter);
// apiRouter.use('/audit-logs', auditLogRouter);
