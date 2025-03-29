import { Privy } from '@privy-io/sdk';

const privy = new Privy({
  apiKey: process.env.PRIVY_API_KEY,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await privy.login(email, password);
    return response;
  } catch (error: any) {
    throw new Error('Login failed: ' + error.message);
  }
};

export const logout = async () => {
  try {
    await privy.logout();
  } catch (error: any) {
    throw new Error('Logout failed: ' + error.message);
  }
};
