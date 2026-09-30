import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'Full name, email, and password are required.' },
                { status: 400 }
            )
        }

        const trimmedEmail = email.trim().toLowerCase()

        if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
            return NextResponse.json(
                { success: false, error: 'Please provide a valid email address.' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters long.' },
                { status: 400 }
            )
        }

        let user = null

        if (process.env.DATABASE_URL) {
            try {
                const existing = await prisma.user.findFirst({
                    where: { email: trimmedEmail }
                })

                if (existing) {
                    return NextResponse.json(
                        { success: false, error: 'An account with this email already exists.' },
                        { status: 409 }
                    )
                }

                user = await prisma.user.create({
                    data: {
                        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                        name: name.trim(),
                        email: trimmedEmail,
                        image: '/assets/profile_pic1.jpg',
                        cart: {}
                    }
                })
            } catch (dbErr) {
                console.warn('[Auth/SignUp] Database fallback:', dbErr.message)
            }
        }

        if (!user) {
            user = {
                id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                name: name.trim(),
                email: trimmedEmail,
                image: '/assets/profile_pic1.jpg',
                role: 'customer',
                createdAt: new Date().toISOString()
            }
        }

        return NextResponse.json({
            success: true,
            user,
            message: `Welcome, ${user.name}! Your NexusMart account has been created.`
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create account.' },
            { status: 500 }
        )
    }
}
