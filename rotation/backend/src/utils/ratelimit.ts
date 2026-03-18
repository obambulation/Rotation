export default class TokenBucket {
    private lastRefill: bigint; 
    private tokens: number;
    constructor(private capacity: number, private refillRate: number) {
        this.lastRefill = process.hrtime.bigint();
        this.tokens = this.capacity;
    }

    getTokens(): number {
        return this.tokens;
    }
    refill(): void {
         const now = process.hrtime.bigint();
         var elapsed = Number(now - this.lastRefill) / 1_000_000_000;
         const refill = elapsed * this.refillRate;
         this.tokens = Math.min(this.capacity, this.tokens + Number(refill));
         this.lastRefill = now;

    }

    consume(amount: number): boolean {
        this.refill();
        if (this.tokens < amount){
            return false;
        }
        else {
            this.tokens -= amount;
            return true;
        }
    }


}