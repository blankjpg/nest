export interface Company {
  id: string;
  name: string;
  ticker: string;
  logo?: string;
  merchantAliases: string[];
}

export interface Transaction {
  id: string;
  merchantName: string;
  amount: number;
  timestamp: Date;
  companyId: string | null;
  savedAmount: number;
}

export interface MonthlySummary {
  month: string;
  totalSpent: number;
  totalSpentAtPublicCompanies: number;
  totalSaved: number;
  companyBreakdown: CompanySpend[];
}

export interface CompanySpend {
  company: Company;
  totalSpent: number;
  savedAmount: number;
  investmentPercentage: number;
}

export interface Holding {
  companyId: string;
  company: Company;
  shares: number;
  averageCost: number;
  currentValue: number;
}

export interface Portfolio {
  holdings: Holding[];
  totalValue: number;
}

export interface Settings {
  savingsRate: number;
  autoInvest: boolean;
  excludedCompanies: string[];
}

export interface InvestmentAllocation {
  companyId: string;
  amount: number;
  percentage: number;
}
