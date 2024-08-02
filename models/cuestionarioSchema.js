import mongoose from "mongoose";

const nextQuestionSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    nextq: {
        type: String,
        required: true
    }
}, { _id: false });

const cuestionarioSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    field: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    nextq: {
        type: mongoose.Schema.Types.Mixed // This allows the field to be either a Map or a String
    }
}, { timestamps: true });

export const Cuestionario = mongoose.model("Cuestionario", cuestionarioSchema);
