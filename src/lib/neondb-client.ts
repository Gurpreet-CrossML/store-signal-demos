import { neon } from '@neondatabase/serverless';
import { ApiResponse } from '@/lib/types';
import { neondbTables } from '@/lib/neondb-tables';

async function executeListQuery(tableName: string) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined in environment variables');
    }

    const client = neon(connectionString);
    const query = `SELECT * FROM ${tableName}`;
    const result = await client.query(query);
    return result;
}

export async function listStores(): Promise<ApiResponse> {
    try{
        const stores = await executeListQuery(neondbTables.stores);
        return { status: 'success', message: 'Stores retrieved successfully', data: stores };
    } catch (error) {
        return { 
            status: 'error', 
            message: 'Failed to retrieve stores', 
            data: { 
                error: error instanceof Error ? error.message : 'Unknown error' 
            } 
        };
    }
}