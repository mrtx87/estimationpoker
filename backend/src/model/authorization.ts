export interface IAuthorization {
    userId: string;
    entitlements: string[];
}

export class Authorization implements IAuthorization{
    userId: string;
    entitlements: string[];

    constructor() {
    }

    getUserId() {
        return this.userId;
    }

    setUserId(value: string) {
        this.userId = value;
    }

    getEntitlements() {
        return this.entitlements;
    }

    setEntitlements(value: string[]) {
        this.entitlements = value;
    }

    static isAuthorized(authorization: Authorization): boolean {
        return Boolean(authorization?.entitlements && authorization?.userId);
    }

    static isNotAuthorized(authorization: Authorization): boolean {
        return !this.isAuthorized(authorization);
    }

    hasEntitlement(entitlement: string) {
        return this.entitlements.find(e => e === entitlement);
    }

    static of(init: Partial<Authorization>) {
        const authorization = new Authorization();
        authorization.userId = init?.userId;
        authorization.entitlements = init?.entitlements;
        return authorization;
    }

}
