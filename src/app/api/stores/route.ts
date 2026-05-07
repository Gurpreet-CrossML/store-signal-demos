import { listStores } from '@/lib/neondb-client';
import { ApiResponse } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    let response: ApiResponse
    try {
        response = await listStores();
        return NextResponse.json(response);
    } catch (error) {
        response = {
            status: 'error',
            message: 'Failed to retrieve stores',
            data: {
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        };
        return NextResponse.json(response);
    }
}
