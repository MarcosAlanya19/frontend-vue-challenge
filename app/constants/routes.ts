export const ROUTES = {
  home: "/",
  login: "/login",
  history: "/history",
  accounts: "/accounts",
  referrals: "/referrals",
  benefits: "/benefits",
  alerts: "/alerts",
  koinks: "/koinks",
  help: "/help",
  onboarding: {
    personalData: "/onboarding/personal-data",
  },
  transaction: {
    create: "/transaction/create",
    transfer: "/transaction/transfer",
    receipt: "/transaction/receipt",
    success: "/transaction/success",
  },
} as const;
