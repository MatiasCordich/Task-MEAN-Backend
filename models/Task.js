const { Schema, model } = require("mongoose");


const TaskSchema = new Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
},
    {
        timestamps: true
    }
)

module.exports = model('Task', TaskSchema)
