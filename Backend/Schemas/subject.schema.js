const z = require("zod");

const subjectSchema = z.object({
    name: z.string().min(1, { message: "Subject name is required" })
})

module.exports = subjectSchema;