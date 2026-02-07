import { NextResponse } from 'next/server'
import { deleteRSVPResponse } from '@/lib/storage'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    deleteRSVPResponse(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting RSVP:', error)
    return NextResponse.json({ error: 'Failed to delete RSVP' }, { status: 500 })
  }
}

