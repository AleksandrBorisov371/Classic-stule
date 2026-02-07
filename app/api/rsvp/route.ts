import { NextResponse } from 'next/server'
import { addRSVPResponse } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    addRSVPResponse({
      name: body.name,
      attending: body.attending,
      guestsCount: body.guestsCount || 1,
      comment: body.comment || '',
      selectedDrinks: body.selectedDrinks || [],
      wish: body.wish || '',
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 })
  }
}

