import rateLimt from "express-rate-limit";

export const createRateLimiter = (
    windowMs: number,
    limit: number
) => { 
    return rateLimt({
        windowMs,
        limit,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        ipv6Subnet: 52,
        message: "Too many requests, please try again later."
    })
}

export default createRateLimiter;
