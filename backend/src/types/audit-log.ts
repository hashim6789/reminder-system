export interface IAuditLog {
  id: string;
  message: string;
  type: 'reminder' | 'delete' | 'create' | 'update' | 'toggle';
  createdAt: Date;
}

export type CreateAuditLogDTO = Omit<IAuditLog, 'id' | 'createdAt'>;
