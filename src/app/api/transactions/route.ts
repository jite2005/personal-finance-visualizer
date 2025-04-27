import { NextRequest, NextResponse } from 'next/server';

let transactions = [
  { _id: '1', amount: 100, date: '2023-06-01', description: 'Groceries' },
  { _id: '2', amount: 50, date: '2023-06-05', description: 'Transport' },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.amount || !data.date || !data.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newTransaction = { ...data, _id: (transactions.length + 1).toString() };
    transactions.push(newTransaction);
    return NextResponse.json({ insertedId: newTransaction._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data._id || !data.amount || !data.date || !data.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const index = transactions.findIndex(t => t._id === data._id);
    if (index === -1) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    transactions[index] = data;
    return NextResponse.json({ message: 'Transaction updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }
    transactions = transactions.filter(t => t._id !== id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
