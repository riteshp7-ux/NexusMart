import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    let dbStatus = 'disconnected'
    if (process.env.DATABASE_URL) {
        try {
            await prisma.$queryRaw`SELECT 1`
            dbStatus = 'connected'
        } catch {
            dbStatus = 'error'
        }
    }

    return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'NexusMart Commerce API',
        version: '1.0.0',
        database: dbStatus
    })
}
