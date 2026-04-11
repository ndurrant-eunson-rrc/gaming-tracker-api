export interface AuthorizationOptions {
    hasRole: Array<"admin" | "user" | "viewer">;
    allowSameUser?: boolean;
}