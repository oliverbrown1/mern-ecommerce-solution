const { Ratelimit } = require("@upstash/ratelimit")
const { Redis } = require("@upstash/redis");


const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
})

module.exports = ratelimit