import cron from 'node-cron';
import { AuditLogRepository } from '@/repositories/implementations/AuditRepository';
import { AuditLogService } from '@/services/implementations/AuditLogService';
import { prisma } from '@/configs';

export function startReminderCron() {
  const auditRepository = new AuditLogRepository(prisma);
  const auditService = new AuditLogService(auditRepository);

  cron.schedule('* * * * *', async () => {
    const now = new Date();

    const reminderRules = await prisma.reminderRule.findMany({
      where: { isActive: true },
      include: { task: true },
    });

    reminderRules.forEach(async (rule) => {
      const dueDate = new Date(rule.task.dueDate);
      const reminderTime = new Date(dueDate.getTime() - rule.minutesBefore * 60000);

      const isSameMinute =
        reminderTime.getFullYear() === now.getFullYear() &&
        reminderTime.getMonth() === now.getMonth() &&
        reminderTime.getDate() === now.getDate() &&
        reminderTime.getHours() === now.getHours() &&
        reminderTime.getMinutes() === now.getMinutes();

      if (isSameMinute) {
        const message = `Reminder triggered for task "${rule.task.title}" due at ${dueDate.toLocaleString()}`;
        console.log(`[Reminder] ${message}`);

        await auditService.create({
          message,
          type: 'reminder',
        });
      }
    });
  });

  console.log('✅ Reminder cron job started (every minute)');
}
