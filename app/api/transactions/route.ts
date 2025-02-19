import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Transaction from "@/lib/transactions";

export async function GET() {
  await connectToDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  await connectToDB();
  const data = await req.json();
  const transaction = await Transaction.create(data);
  return NextResponse.json(transaction);
}

export async function DELETE(req: NextRequest) {
  await connectToDB();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted successfully" });
}
