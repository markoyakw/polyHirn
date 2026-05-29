import type { TTest } from "@/types/test"

const MOCK_TEST: TTest = {
    id: "mock-test-1",
    name: "History of Science",
    passPoints: 10,
    totalPoints: 18,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    author: "teacher-1",
    testResultArr: [],
    questionArr: [
        {
            id: "q1",
            type: "multipleChoice",
            questionText: "Which scientist is credited with formulating the theory of general relativity?",
            pointsPerAnswer: 4,
            answerArr: [
                { id: "a1", answerText: "Isaac Newton", isRight: false },
                { id: "a2", answerText: "Albert Einstein", isRight: true },
                { id: "a3", answerText: "Niels Bohr", isRight: false },
                { id: "a4", answerText: "Max Planck", isRight: false },
            ],
        },
        {
            id: "q2",
            type: "trueFalse",
            questionText: "The speed of light in a vacuum is approximately 300,000 km/s.",
            pointsPerQuestion: 4,
            answer: true,
        },
        {
            id: "q3",
            type: "matchPairs",
            questionText: "Match each scientist with their major contribution.",
            pointsPerAnswer: 2,
            pairArr: [
                {
                    id: "p1",
                    items: [
                        { id: "l1", answerText: "Charles Darwin" },
                        { id: "r1", answerText: "Theory of evolution" },
                    ],
                },
                {
                    id: "p2",
                    items: [
                        { id: "l2", answerText: "Marie Curie" },
                        { id: "r2", answerText: "Discovery of radioactivity" },
                    ],
                },
                {
                    id: "p3",
                    items: [
                        { id: "l3", answerText: "Isaac Newton" },
                        { id: "r3", answerText: "Laws of motion and gravity" },
                    ],
                },
            ],
        },
        {
            id: "q4",
            type: "shortAnswer",
            questionText: "What is the chemical symbol for gold?",
            pointsPerQuestion: 4,
            correctAnswerArr: [
                { id: "ca1", answerText: "Au" },
                { id: "ca2", answerText: "au" },
            ],
        },
    ],
}

export { MOCK_TEST }
