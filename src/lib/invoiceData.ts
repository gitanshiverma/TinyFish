import { InvoiceItem } from '@/types/audit';

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1057',
    invoiceNumber: 'INV-2026-1057',
    vendorName: 'Acme Supplies',
    dueDate: 'Jun 3, 2026',
    totalAmount: 1250.00,
    currency: 'USD',
    confidence: 98,
    status: 'Approved',
    taxId: 'US-948271049',
    country: 'United States',
    itemsCount: 3,
    extractedFields: {
      invoiceNumber: 'INV-2026-1057',
      invoiceDate: 'May 31, 2026',
      dueDate: 'Jun 3, 2026',
      totalAmount: 'USD $1,250.00',
      currency: 'USD',
      vendorName: 'Acme Supplies Inc',
      vendorAddress: '100 Industrial Parkway, Austin, TX 78701',
      customerName: 'TechLedger Co.',
      billingAddress: '500 Market Street, Suite 400, San Francisco, CA 94105'
    },
    lineItems: [
      { description: 'Office Consumables Pack A', qty: 10, unitPrice: 45.00, amount: 450.00, poMatchPrice: 45.00, poMatchQty: 10 },
      { description: 'Ergonomic Standing Desk Converters', qty: 4, unitPrice: 200.00, amount: 800.00, poMatchPrice: 200.00, poMatchQty: 4 }
    ]
  },
  {
    id: 'inv-1056',
    invoiceNumber: 'INV-2026-1056',
    vendorName: 'Summit Services',
    dueDate: 'Jun 2, 2026',
    totalAmount: 2400.00,
    currency: 'USD',
    confidence: 96,
    status: 'Approved',
    taxId: 'US-882194012',
    country: 'United States',
    itemsCount: 2,
    extractedFields: {
      invoiceNumber: 'INV-2026-1056',
      invoiceDate: 'May 30, 2026',
      dueDate: 'Jun 2, 2026',
      totalAmount: 'USD $2,400.00',
      currency: 'USD',
      vendorName: 'Summit Services LLC',
      vendorAddress: '345 Innovation Way, Denver, CO 80202',
      customerName: 'TechLedger Co.',
      billingAddress: '500 Market Street, San Francisco, CA'
    },
    lineItems: [
      { description: 'Monthly Infrastructure Maintenance', qty: 1, unitPrice: 2400.00, amount: 2400.00, poMatchPrice: 2400.00, poMatchQty: 1 }
    ]
  },
  {
    id: 'inv-1055',
    invoiceNumber: 'INV-2026-1055',
    vendorName: 'TechCore Solutions',
    dueDate: 'May 31, 2026',
    totalAmount: 860.00,
    currency: 'USD',
    confidence: 94,
    status: 'Approved',
    taxId: 'US-119284019',
    country: 'United States',
    itemsCount: 4,
    extractedFields: {
      invoiceNumber: 'INV-2026-1055',
      invoiceDate: 'May 28, 2026',
      dueDate: 'May 31, 2026',
      totalAmount: 'USD $860.00',
      currency: 'USD',
      vendorName: 'TechCore Solutions Inc',
      vendorAddress: '782 Tech Hub Blvd, Seattle, WA 98101',
      customerName: 'TechLedger Co.',
      billingAddress: '500 Market Street, San Francisco, CA'
    },
    lineItems: [
      { description: 'Cloud Backup Storage Licenses', qty: 5, unitPrice: 172.00, amount: 860.00, poMatchPrice: 172.00, poMatchQty: 5 }
    ]
  },
  {
    id: 'inv-1054',
    invoiceNumber: 'INV-2026-1054',
    vendorName: 'Brightline Consulting',
    dueDate: 'May 30, 2026',
    totalAmount: 303.00,
    currency: 'USD',
    confidence: 92,
    status: 'Needs review',
    issue: 'Price Mismatch detected via TinyFish live web benchmark',
    taxId: 'US-339182012',
    country: 'United States',
    itemsCount: 3,
    extractedFields: {
      invoiceNumber: 'INV-2026-1054',
      invoiceDate: 'May 30, 2026',
      dueDate: 'Jun 29, 2026',
      totalAmount: 'USD $303.00',
      currency: 'USD',
      vendorName: 'Brightline Consulting',
      vendorAddress: '500 Market Street, Suite 400, Austin, TX 78701',
      customerName: 'TechLedger Co.',
      billingAddress: '500 Market Street, San Francisco, CA'
    },
    lineItems: [
      { description: 'Strategy Advisory Hours', qty: 2, unitPrice: 151.50, amount: 303.00, poMatchPrice: 140.00, poMatchQty: 2 }
    ]
  },
  {
    id: 'inv-00432',
    invoiceNumber: 'INV-2026-00432',
    vendorName: 'Summit Technologies LLC',
    dueDate: 'Jun 19, 2026',
    totalAmount: 10013.13,
    currency: 'USD',
    confidence: 87,
    status: 'Needs review',
    issue: 'Tax ID compliance pending TinyFish live web verification',
    taxId: 'US-449182099',
    country: 'United States',
    itemsCount: 3,
    extractedFields: {
      invoiceNumber: 'INV-2026-00432',
      invoiceDate: 'May 20, 2026',
      dueDate: 'Jun 19, 2026',
      totalAmount: 'USD $10,013.13',
      currency: 'USD',
      vendorName: 'Summit Technologies LLC',
      vendorAddress: '345 Innovation Way, Suite 200, Denver, CO 80202',
      customerName: 'Acme Co.',
      billingAddress: '123 Market Street, Floor 4, San Francisco, CA 94105'
    },
    lineItems: [
      { description: 'Cloud Migration Services', qty: 40, unitPrice: 125.00, amount: 5000.00, poMatchPrice: 120.00, poMatchQty: 40 },
      { description: 'Security Assessment', qty: 1, unitPrice: 2500.00, amount: 2500.00, poMatchPrice: 2500.00, poMatchQty: 1 },
      { description: 'Data Integration & ETL', qty: 1, unitPrice: 1750.00, amount: 1750.00, poMatchPrice: 1750.00, poMatchQty: 1 }
    ]
  },
  {
    id: 'inv-1053',
    invoiceNumber: 'INV-2026-1053',
    vendorName: 'Nexora Industries',
    dueDate: 'May 28, 2026',
    totalAmount: 1850.00,
    currency: 'USD',
    confidence: 91,
    status: 'Needs review',
    issue: 'Quantity Discrepancy (PO vs Invoice)',
    taxId: 'DE-312984019',
    country: 'Germany',
    itemsCount: 2,
    extractedFields: {
      invoiceNumber: 'INV-2026-1053',
      invoiceDate: 'May 25, 2026',
      dueDate: 'May 28, 2026',
      totalAmount: 'USD $1,850.00',
      currency: 'USD',
      vendorName: 'Nexora Industries GMBH',
      vendorAddress: 'Industriestrasse 14, Berlin, Germany',
      customerName: 'TechLedger Co.',
      billingAddress: '500 Market Street, San Francisco, CA'
    },
    lineItems: [
      { description: 'Hardware Components Pack', qty: 12, unitPrice: 154.16, amount: 1850.00, poMatchPrice: 154.16, poMatchQty: 10 }
    ]
  }
];
