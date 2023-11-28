export class ValueByAmount {
    value: string;
    amount: number;

    constructor(init: Partial<ValueByAmount>) {
        this.value = init.value;
        this.amount = init.amount;
    }
    public static of(init: any): ValueByAmount {
        return new ValueByAmount(init);
    }
}