import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { productDummyData } from '@/assets/assets'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search')?.toLowerCase() || ''
        const category = searchParams.get('category') || ''
        const sort = searchParams.get('sort') || 'latest'
        const limit = parseInt(searchParams.get('limit') || '0', 10)

        let products = []

        // Try to fetch from database if Prisma is configured
        if (process.env.DATABASE_URL) {
            try {
                const where = {}
                if (search) {
                    where.OR = [
                        { name: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } }
                    ]
                }
                if (category && category !== 'All') {
                    where.category = { equals: category, mode: 'insensitive' }
                }

                const orderBy = {}
                if (sort === 'price_asc') orderBy.price = 'asc'
                else if (sort === 'price_desc') orderBy.price = 'desc'
                else orderBy.createdAt = 'desc'

                products = await prisma.product.findMany({
                    where,
                    orderBy,
                    take: limit > 0 ? limit : undefined,
                    include: { rating: true, store: true }
                })
            } catch (dbError) {
                console.warn('[API/products] Database query fallback:', dbError.message)
            }
        }

        // Fallback to in-memory mock products if DB has no data
        if (!products || products.length === 0) {
            products = [...productDummyData]

            if (search) {
                products = products.filter(p =>
                    p.name.toLowerCase().includes(search) ||
                    p.description.toLowerCase().includes(search)
                )
            }
            if (category && category !== 'All') {
                products = products.filter(p =>
                    p.category.toLowerCase() === category.toLowerCase()
                )
            }
            if (sort === 'price_asc') {
                products.sort((a, b) => a.price - b.price)
            } else if (sort === 'price_desc') {
                products.sort((a, b) => b.price - a.price)
            } else {
                products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
            if (limit > 0) {
                products = products.slice(0, limit)
            }
        }

        return NextResponse.json({
            success: true,
            count: products.length,
            data: products
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, description, mrp, price, category, images, storeId } = body

        if (!name || !price || !category) {
            return NextResponse.json(
                { success: false, error: 'Missing required product fields: name, price, category' },
                { status: 400 }
            )
        }

        let newProduct
        if (process.env.DATABASE_URL) {
            newProduct = await prisma.product.create({
                data: {
                    name,
                    description: description || '',
                    mrp: parseFloat(mrp) || parseFloat(price),
                    price: parseFloat(price),
                    category,
                    images: images || [],
                    storeId: storeId || 'cmemkb98v0001tat8r1hiyxhn'
                }
            })
        } else {
            newProduct = {
                id: `prod_${Date.now()}`,
                name,
                description: description || '',
                mrp: parseFloat(mrp) || parseFloat(price),
                price: parseFloat(price),
                category,
                images: images || ['/assets/product_img1.png'],
                storeId: storeId || 'store_1',
                rating: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        }

        return NextResponse.json({
            success: true,
            data: newProduct,
            message: 'Product created successfully'
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create product' },
            { status: 500 }
        )
    }
}
