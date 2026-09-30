// Database Seeding Script for NexusMart
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting NexusMart database seed...')

    // 1. Seed Demo User / Merchant
    const user = await prisma.user.upsert({
        where: { id: 'usr_nexus_seller_01' },
        update: {},
        create: {
            id: 'usr_nexus_seller_01',
            name: 'Alex Morgan',
            email: 'seller@nexusmart.io',
            image: '/assets/profile_pic1.jpg',
            cart: {}
        }
    })

    console.log('👤 Created merchant user:', user.name)

    // 2. Seed Flagship Store
    const store = await prisma.store.upsert({
        where: { username: 'nexus_flagship' },
        update: {},
        create: {
            userId: user.id,
            name: 'Nexus Flagship Store',
            description: 'Official verified hardware and workspace essentials marketplace.',
            username: 'nexus_flagship',
            address: '100 Silicon Blvd, Suite 400, San Francisco, CA 94107',
            status: 'approved',
            isActive: true,
            logo: '/assets/brand_logo.svg',
            email: 'support@nexusmart.io',
            contact: '+1 415-555-0100'
        }
    })

    console.log('🏬 Created store:', store.name)

    // 3. Seed Coupons
    const coupons = [
        { code: 'NEXUS20', description: '20% Off Welcome Discount', discount: 20, forNewUser: true, isPublic: true, expiresAt: new Date('2027-12-31') },
        { code: 'TECH10', description: '10% Off All Electronics', discount: 10, forNewUser: false, isPublic: true, expiresAt: new Date('2027-12-31') },
        { code: 'PLUSMEMBER', description: '15% Off VIP Members', discount: 15, forNewUser: false, isPublic: false, expiresAt: new Date('2027-12-31') }
    ]

    for (const c of coupons) {
        await prisma.coupon.upsert({
            where: { code: c.code },
            update: {},
            create: c
        })
    }
    console.log(`🎟️ Seeded ${coupons.length} promotional coupons`)

    console.log('✅ Seeding completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
