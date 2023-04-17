export type Role =
  | "DIRECTOR"
  | "LEADER"
  | "TEAM"
  | "ALUMNI"
  | "AMBASSADOR"
  | "USER";

export interface Member {
  id: number;
  teamId: number;
  userId: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
  name: string;
  profileImageUrl: string;
}
