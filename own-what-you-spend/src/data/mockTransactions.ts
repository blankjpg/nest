import { Transaction } from '../types';
import { matchMerchantToCompany, calculateSavings } from '../lib/merchantMatcher';

const DEFAULT_SAVINGS_RATE = 5;

const rawTransactions = [
  { merchant: 'TESCO STORES 3412', amount: 45.32, daysAgo: 1 },
  { merchant: 'GREGGS', amount: 4.50, daysAgo: 1 },
  { merchant: 'SPOTIFY', amount: 10.99, daysAgo: 2 },
  { merchant: 'LOCAL CAFE BRIGHTON', amount: 8.50, daysAgo: 2 },
  { merchant: 'AMAZON.CO.UK', amount: 23.99, daysAgo: 3 },
  { merchant: 'SAINSBURYS 1234', amount: 67.80, daysAgo: 3 },
  { merchant: 'NETFLIX', amount: 15.99, daysAgo: 4 },
  { merchant: 'THE CROWN PUB', amount: 34.20, daysAgo: 4 },
  { merchant: 'SHELL FUEL', amount: 52.00, daysAgo: 5 },
  { merchant: 'APPLE.COM/BILL', amount: 4.99, daysAgo: 5 },
  { merchant: 'TESCO EXPRESS', amount: 12.45, daysAgo: 6 },
  { merchant: 'PRET A MANGER', amount: 7.20, daysAgo: 6 },
  { merchant: 'STARBUCKS', amount: 4.85, daysAgo: 7 },
  { merchant: 'M&S SIMPLY FOOD', amount: 18.90, daysAgo: 8 },
  { merchant: 'UBER', amount: 12.50, daysAgo: 8 },
  { merchant: 'BP PETROL', amount: 48.50, daysAgo: 9 },
  { merchant: 'GOOGLE PLAY', amount: 2.99, daysAgo: 9 },
  { merchant: 'MCDONALDS', amount: 8.99, daysAgo: 10 },
  { merchant: 'LOCAL BARBER', amount: 25.00, daysAgo: 11 },
  { merchant: 'NEXT RETAIL', amount: 45.00, daysAgo: 11 },
  { merchant: 'VODAFONE', amount: 30.00, daysAgo: 12 },
  { merchant: 'COSTA COFFEE', amount: 4.60, daysAgo: 12 },
  { merchant: 'AMAZON PRIME VIDEO', amount: 5.99, daysAgo: 13 },
  { merchant: 'JD SPORTS', amount: 89.99, daysAgo: 14 },
  { merchant: 'DELIVEROO', amount: 18.50, daysAgo: 14 },
  { merchant: 'SAINSBURY\'S', amount: 54.30, daysAgo: 15 },
  { merchant: 'NIKE.COM', amount: 95.00, daysAgo: 16 },
  { merchant: 'CINEMA ODEON', amount: 22.00, daysAgo: 17 },
  { merchant: 'TESCO EXTRA', amount: 89.45, daysAgo: 18 },
  { merchant: 'MICROSOFT STORE', amount: 6.99, daysAgo: 19 },
  { merchant: 'LOCAL RESTAURANT', amount: 56.80, daysAgo: 19 },
  { merchant: 'GREGGS', amount: 3.75, daysAgo: 20 },
  { merchant: 'BOOTS PHARMACY', amount: 15.40, daysAgo: 21 },
  { merchant: 'SHELL UK', amount: 55.30, daysAgo: 22 },
  { merchant: 'WATERSTONES', amount: 18.99, daysAgo: 23 },
  { merchant: 'BT', amount: 45.00, daysAgo: 24 },
  { merchant: 'APPLE STORE LONDON', amount: 1299.00, daysAgo: 25 },
  { merchant: 'MARKS AND SPENCER', amount: 34.50, daysAgo: 26 },
  { merchant: 'YOUTUBE PREMIUM', amount: 11.99, daysAgo: 27 },
  { merchant: 'AMAZON EU', amount: 42.50, daysAgo: 28 },
];

export const mockTransactions: Transaction[] = rawTransactions.map((tx, index) => {
  const companyId = matchMerchantToCompany(tx.merchant);
  const savedAmount = companyId ? calculateSavings(tx.amount, DEFAULT_SAVINGS_RATE) : 0;
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - tx.daysAgo);
  timestamp.setHours(Math.floor(Math.random() * 24));
  timestamp.setMinutes(Math.floor(Math.random() * 60));

  return {
    id: `tx-${index + 1}`,
    merchantName: tx.merchant,
    amount: tx.amount,
    timestamp,
    companyId,
    savedAmount,
  };
});
