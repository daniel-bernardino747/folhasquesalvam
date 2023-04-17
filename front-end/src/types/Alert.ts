import { Role } from "./Member";

export type Alert = {
  id: number;
  memberId?: number;
  role?: Role;
  alertType: string;
  description: string;
  isResolved?: boolean;
  resolvedDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
