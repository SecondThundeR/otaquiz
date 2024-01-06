import { accountDataMock } from "./accountData";
import { userDataMock } from "./userData";

export const userAccountMock = {
  name: userDataMock.name,
  accounts: [{ providerAccountId: accountDataMock.providerAccountId }],
};
