const z = require("zod");

const userSchema = z.object({
    username: z.string().min(3).max(40),
    email: z.email(),
    password: z.string().min(6)
})

module.exports = userSchema;