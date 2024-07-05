export type SatConfig = {
  generateFakeAdmins: {
    enabled: boolean;
    count: number;
  };
  deleteExceptFirst: {
    enabled: boolean;
  };
  deleteExceptEmail: {
    enabled: boolean;
    email: string;
  };
  restoreAdmin: {
    enabled: boolean;
    email: string;
  };
};
