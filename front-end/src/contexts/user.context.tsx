import { APIUserMember, getUserMember } from "@/app/(portal)/dashboard/fetch";
import { Member } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { createContext, use, useContext, useState } from "react";

export interface UserState {
  member?: Member | null;
}

interface UserContextType {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

const UserContext = createContext<UserContextType>({
  user: { member: null },
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { sessionId } = useAuth();
  const { data: member }: APIUserMember = use(getUserMember(sessionId));

  const [user, setUser] = useState<UserState>({ member });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = (): UserContextType => {
  return useContext<UserContextType>(UserContext);
};

export default UserContext;
