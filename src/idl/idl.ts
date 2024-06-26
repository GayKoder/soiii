export const idl = {
    "version": "0.1.0",
    "name": "solana_lamport_transfer",
    "instructions": [
        {
            "name": "transferLamports",
            "accounts": [
                { "name": "from", "isMut": true, "isSigner": true },
                { "name": "to", "isMut": true, "isSigner": false },
                { "name": "systemProgram", "isMut": false, "isSigner": false }
            ],
            "args": [{ "name": "amount", "type": "u64" }]
        }
    ]
} as const
