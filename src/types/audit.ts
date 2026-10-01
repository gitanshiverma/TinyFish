export type ActiveTab = 'dashboard' | 'invoices' | 'matching' | 'tinyfish_agent' | 'discrepancies' | 'vendors' | 'reports';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  dueDate: string;
  totalAmount: number;
  currency: string;
  confidence: number;
  status: 'Approved' | 'Needs review' | 'Flagged';
  taxId: string;
  country: string;
  itemsCount: number;
  issue?: string;
  pdfUrl?: string;
  extractedFields: {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    totalAmount: string;
    currency: string;
    vendorName: string;
    vendorAddress: string;
    customerName: string;
    billingAddress: string;
  };
  lineItems: {
    description: string;
    qty: number;
    unitPrice: number;
    amount: number;
    poMatchPrice?: number;
    poMatchQty?: number;
  }[];
}

export type AuditPreset = 'vendor_verification' | 'invoice_crossmatch' | 'sanctions_watchlist' | 'esg_compliance';

export interface AuditRequest {
  id: string;
  preset: AuditPreset;
  vendorName: string;
  taxId: string;
  country: string;
  invoiceNumber?: string;
  amount?: number;
  currency?: string;
  productDescription?: string;
  customTargetUrl?: string;
  useLiveTinyFish?: boolean;
}

export interface AgentStep {
  id: string;
  stepNumber: number;
  title: string;
  action: 'SEARCH' | 'NAVIGATE' | 'FETCH' | 'INPUT' | 'CLICK' | 'EXTRACT' | 'VERIFY';
  targetUrl: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  detail: string;
  timestamp: string;
  selector?: string;
  inputValue?: string;
  extractedData?: Record<string, unknown>;
  screenshotUrl?: string;
}

export interface TinyFishCapabilityLog {
  id: string;
  capability: 'Search API' | 'Fetch API' | 'Web Agent' | 'Browser (CDP/Playwright)';
  endpoint: string;
  method: string;
  status: number;
  latencyMs: number;
  payload: Record<string, unknown>;
  responseSnippet: string;
  timestamp: string;
}

export interface AuditVerificationResult {
  id: string;
  auditRequestId: string;
  createdAt: string;
  overallStatus: 'PASS' | 'WARN' | 'FAIL';
  complianceScore: number;
  vendorName: string;
  taxId: string;
  legalEntityVerified: boolean;
  activeStatusOnWeb: boolean;
  sanctionMatch: boolean;
  priceCheckStatus: 'OPTIMAL' | 'FAIR' | 'INFLATED' | 'NOT_APPLICABLE';
  marketAveragePrice?: number;
  invoiceAmount?: number;
  discrepancies: string[];
  findings: {
    category: string;
    description: string;
    verifiedOnWeb: boolean;
    sourceUrl: string;
    evidenceText: string;
  }[];
  tinyfishTelemetry: {
    searchQueriesCount: number;
    pagesFetchedCount: number;
    agentActionsCount: number;
    screenshotsCaptured: number;
    executionTimeSeconds: number;
  };
  proofScreenshots: {
    title: string;
    url: string;
    capturedAt: string;
    sourceDomain: string;
    hashProof: string;
  }[];
  auditSignatureHash: string;
}
