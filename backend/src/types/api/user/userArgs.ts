export type createUserBody = {
  username: string;
  email: string;
  password: string;
};

export type loginBody = {
  email: string;
};

export type joinGroupBody = {
  groupId: number;
};

export type leaveGroupBody = {
  groupId: number;
};
