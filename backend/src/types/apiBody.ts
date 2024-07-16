export type createUserBody = {
  username: string;
  email: string;
  password: string;
};

export type joinGroupBody = {
  groupId: number;
};

export type leaveGroupBody = {
  groupId: number;
};
export type createGroupBody = {
  name: string;
};

export type checkMembershipBody = {
  groupId?: number;
};

export type createEventBody = {
  title: string;
  description: string;
  groupId: number;
};
