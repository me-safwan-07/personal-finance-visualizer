import Transaction from "@/app/models/Transaction";
import connectDB from "@/app/utils/db";


connectDB();

// GET all transactions
interface TransactionRequest {
    amount: number;
    description: string;
    date: Date;
    category: string;
}

interface TransactionResponse {
    amount: number;
    description: string;
    date: Date;
    category: string;
    _id: string;
}

export default async function handler(
    req: { method: string; body: TransactionRequest }, 
    res: { 
        status: (code: number) => { 
            json: (data: TransactionResponse | TransactionResponse[] | { message: string }) => void 
        }
    }
) {
    if (req.method === "GET") {
        const transactions = await Transaction.find();
        return res.status(200).json(transactions);
    }

    if (req.method === "POST") {
        const { amount, description, date, category } = req.body;
        const newTransaction = new Transaction({ amount, description, date, category });
        await newTransaction.save();
        return res.status(201).json(newTransaction);
    }

    res.status(400).json({ message: "Invalid request" });
}
