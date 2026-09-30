import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required.' },
                { status: 400 }
            )
        }

        const trimmedEmail = email.trim().toLowerCase()

        let user = null

        if (process.env.DATABASE_URL) {
            try {
                user = await prisma.user.findFirst({
                    where: { email: trimmedEmail }
                })
            } catch (dbErr) {
                console.warn('[Auth/SignIn] Database fallback:', dbErr.message)
            }
        }

        if (!user) {
            // Check if demo merchant / user
            if (trimmedEmail === 'seller@nexusmart.io' || trimmedEmail === 'admin@nexusmart.io') {
                user = {
                    id: 'usr_nexus_seller_01',
                    name: 'Alex Morgan',
                    email: trimmedEmail,
                    image: '/assets/profile_pic1.jpg',
                    role: 'merchant'
                }
            } else {
                user = {
                    id: `usr_${Date.now()}`,
                    name: trimmedEmail.split('@')[0].replace(/[._]/g, ' '),
                    email: trimmedEmail,
                    image: '/assets/profile_pic1.jpg',
                    role: 'customer'
                }
            }
        }

        return NextResponse.json({
            success: true,
            user,
            message: `Welcome back, ${user.name}!`
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to sign in.' },
            { status: 500 }
        )
    }
}
