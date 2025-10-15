export interface Operation {
    type: "Depósito" | "Saque";
    value: number;
    date: string;
}

export interface UserData {
    username: string;
    password: string;
    balance: number;
    history: Operation[];
}