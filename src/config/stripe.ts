export const STRIPE_CONFIG = {
  publicKey: process.env.VITE_STRIPE_PUBLIC_KEY || '',
  prices: {
    basic: {
      monthly: 'price_basic_monthly',
      annual: 'price_basic_annual'
    },
    standard: {
      monthly: 'price_standard_monthly',
      annual: 'price_standard_annual'
    },
    premium: {
      monthly: 'price_premium_monthly',
      annual: 'price_premium_annual'
    }
  }
};