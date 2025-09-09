import express from 'express';
// import { authRouter } from './auth.routes';
import { reminderRuleRouter } from './reminder-rule.routes';
import { taskRouter } from './task.routes';

export const apiRouter = express.Router();

// apiRouter.use('/auth', authRouter);
apiRouter.use('/reminder-rules', reminderRuleRouter);
apiRouter.use('/tasks', taskRouter);
