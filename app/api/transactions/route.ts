import dbConnect from "@/lib/db";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find({}).sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (err) {
    return NextResponse.json({error: 'Failed to fetch transactions', err }, { status: 500});
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (err) {
    return NextResponse.json({error: 'Failed to create transaction', err }, { status: 500});
  }
};

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({error: 'Missing transaction ID'}, { status: 400 });
    }

    await dbConnect();
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return NextResponse.json({error: 'Transaction not found'}, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    return NextResponse.json({error: 'Failed to delete transaction', err }, { status: 500});
  }
};

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({error: 'Missing transaction ID'}, { status: 400 });
    }
    
    const body = await request.json();
    await dbConnect();
    const transaction = await Transaction.findByIdAndUpdate(id, body);
    
    if (!transaction) {
      return NextResponse.json({error: 'Transaction not found'}, { status: 404 });
    }
    
    return NextResponse.json(transaction);
  } catch (err) {
    return NextResponse.json({error: 'Failed to update transaction', err }, { status: 500});
  }
};