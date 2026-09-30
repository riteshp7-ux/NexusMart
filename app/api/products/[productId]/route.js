import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { productDummyData } from '@/assets/assets'

export async function GET(request, { params }) {
    try {
        const { productId } = await params

        let product = null

        if (process.env.DATABASE_URL) {
            try {
                product = await prisma.product.findUnique({
                    where: { id: productId },
                    include: { rating: true, store: true }
                })
            } catch (err) {
                console.warn('[API/products/[id]] Prisma error, falling back:', err.message)
            }
        }

        if (!product) {
            product = productDummyData.find(p => p.id === productId)
        }

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data: product })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
