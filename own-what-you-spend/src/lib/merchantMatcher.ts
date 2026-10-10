import { companies } from '../data/companies';

/**
 * Matches a raw merchant name from a card transaction to a known public company
 * @param merchantName - The raw merchant string from the transaction
 * @returns Company ID if matched, null otherwise
 */
export function matchMerchantToCompany(merchantName: string): string | null {
  const normalized = merchantName.toUpperCase().trim();

  for (const company of companies) {
    for (const alias of company.merchantAliases) {
      if (normalized.includes(alias.toUpperCase())) {
        return company.id;
      }
    }
  }

  return null;
}

/**
 * Calculates the savings amount based on the transaction amount and savings rate
 * @param amount - Transaction amount in GBP
 * @param savingsRate - Savings rate as a percentage (1-60)
 * @returns Saved amount in GBP
 */
export function calculateSavings(amount: number, savingsRate: number): number {
  return Number((amount * (savingsRate / 100)).toFixed(2));
}
