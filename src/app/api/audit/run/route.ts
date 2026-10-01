import { NextRequest, NextResponse } from 'next/server';
import { TinyFishClient } from '@/lib/tinyfish';
import { AuditRequest } from '@/types/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const auditRequest: AuditRequest = body.auditRequest;
    const apiKey = body.apiKey;

    if (!auditRequest || !auditRequest.vendorName || !auditRequest.taxId) {
      return NextResponse.json({ error: 'Vendor name and Tax ID are required' }, { status: 400 });
    }

    const client = new TinyFishClient(apiKey);
    const result = await client.runAuditPipeline(auditRequest);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
