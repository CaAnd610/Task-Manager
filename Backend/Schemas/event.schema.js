const z = require("zod");

const eventSchema = z.object({
    subject_id: z.number(),
    title: z.string().min(1, { message : "Title cannot be empty" }).refine(
        title => title.trim().length > 0,
        { message: "Title cannot be empty or whitespace" }
    ),
    event_type: z.enum(["Homework", "Exam"]),
    due_date: z.string().refine(date => !isNaN(Date.parse(date)), { message : "Due date must be a valid date" }),
    due_time: z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
        { message: "Due time must be in HH:MM:SS format" }
    ).optional(),
    notes: z.string().refine(
        notes => notes.trim().length > 0,
        { message: "Notes cannot be a whitespace" }
    ).optional(),
    event_status: z.enum([0, 1]).default(0),
    created_at: z.string().refine(date => !isNaN(Date.parse(date)), { message : "Created at must be a valid date" })
})

module.exports = eventSchema;