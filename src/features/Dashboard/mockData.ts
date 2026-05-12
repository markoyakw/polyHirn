import type {
    TMatchPairsQuestion,
    TMultipleChoiceQuestion,
    TQuestion,
    TShortAnswerQuestion,
    TTest,
    TTestResult,
    TTestResultFolder,
    TTestResultItem,
    TTestResultTest,
    TTrueFalseQuestion,
} from "@/types/test"

import type {
    TAdmin,
    TAuthor,
    TStudent,
    TUser,
} from "@/types/user"

const mockStudents: TStudent[] = [
    {
        id: "student-1",
        role: "student",
        name: "Anna Müller",
        email: "anna.mueller@example.com",
        testResultArr: [],
    },
    {
        id: "student-2",
        role: "student",
        name: "David Schneider",
        email: "david.schneider@example.com",
        testResultArr: [],
    },
    {
        id: "student-3",
        role: "student",
        name: "Sofia Weber",
        email: "sofia.weber@example.com",
        testResultArr: [],
    },
    {
        id: "student-4",
        role: "student",
        name: "Lukas Fischer",
        email: "lukas.fischer@example.com",
        testResultArr: [],
    },
    {
        id: "student-5",
        role: "student",
        name: "Mia Wagner",
        email: "mia.wagner@example.com",
        testResultArr: [],
    },
    {
        id: "student-6",
        role: "student",
        name: "Noah Becker",
        email: "noah.becker@example.com",
        testResultArr: [],
    },
    {
        id: "student-7",
        role: "student",
        name: "Emma Hoffmann",
        email: "emma.hoffmann@example.com",
        testResultArr: [],
    },
    {
        id: "student-8",
        role: "student",
        name: "Ben Richter",
        email: "ben.richter@example.com",
        testResultArr: [],
    },
    {
        id: "student-9",
        role: "student",
        name: "Lea Klein",
        email: "lea.klein@example.com",
        testResultArr: [],
    },
    {
        id: "student-10",
        role: "student",
        name: "Paul Wolf",
        email: "paul.wolf@example.com",
        testResultArr: [],
    },
    {
        id: "student-11",
        role: "student",
        name: "Clara Neumann",
        email: "clara.neumann@example.com",
        testResultArr: [],
    },
    {
        id: "student-12",
        role: "student",
        name: "Jonas Braun",
        email: "jonas.braun@example.com",
        testResultArr: [],
    },
]

const mockAdmin: TAdmin = {
    id: "admin-1",
    role: "admin",
    name: "System Admin",
    email: "admin@example.com",
}

type TMockTestConfig = {
    id: string
    name: string
    topic: "english" | "german" | "germanHistory"
}

const testConfigs: Record<string, TMockTestConfig[]> = {
    english: [
        {
            id: "english-test-1",
            name: "English Grammar Basics",
            topic: "english",
        },
        {
            id: "english-test-2",
            name: "English Tenses Practice",
            topic: "english",
        },
        {
            id: "english-test-3",
            name: "English Vocabulary A2-B1",
            topic: "english",
        },
        {
            id: "english-test-4",
            name: "English Reading Skills",
            topic: "english",
        },
    ],
    german: [
        {
            id: "german-test-1",
            name: "German Articles",
            topic: "german",
        },
        {
            id: "german-test-2",
            name: "German Verb Position",
            topic: "german",
        },
        {
            id: "german-test-3",
            name: "German Everyday Vocabulary",
            topic: "german",
        },
        {
            id: "german-test-4",
            name: "German Modal Verbs",
            topic: "german",
        },
    ],
    germanHistory: [
        {
            id: "german-history-test-1",
            name: "German History: Middle Ages",
            topic: "germanHistory",
        },
        {
            id: "german-history-test-2",
            name: "German History: 19th Century",
            topic: "germanHistory",
        },
        {
            id: "german-history-test-3",
            name: "German History: Modern Germany",
            topic: "germanHistory",
        },
    ],
}

const getMultipleChoiceQuestion = (
    testId: string,
    index: number,
    questionText: string,
    answers: string[],
    rightAnswerIndex: number,
): TMultipleChoiceQuestion => {
    return {
        id: `${testId}-q-${index}`,
        type: "multipleChoice",
        questionText,
        pointsPerAnswer: 1,
        answerArr: answers.map((answerText, answerIndex) => ({
            id: `${testId}-q-${index}-a-${answerIndex + 1}`,
            answerText,
            isRight: answerIndex === rightAnswerIndex,
        })),
    }
}

const getTrueFalseQuestion = (
    testId: string,
    index: number,
    questionText: string,
    answer: boolean,
): TTrueFalseQuestion => {
    return {
        id: `${testId}-q-${index}`,
        type: "trueFalse",
        questionText,
        pointsPerQuestion: 1,
        answer,
    }
}

const getShortAnswerQuestion = (
    testId: string,
    index: number,
    questionText: string,
    correctAnswers: string[],
): TShortAnswerQuestion => {
    return {
        id: `${testId}-q-${index}`,
        type: "shortAnswer",
        questionText,
        pointsPerQuestion: 2,
        correctAnswerArr: correctAnswers.map((answerText, answerIndex) => ({
            id: `${testId}-q-${index}-accepted-${answerIndex + 1}`,
            answerText,
        })),
    }
}

const getMatchPairsQuestion = (
    testId: string,
    index: number,
    questionText: string,
    pairs: [string, string][],
): TMatchPairsQuestion => {
    return {
        id: `${testId}-q-${index}`,
        type: "matchPairs",
        questionText,
        pointsPerAnswer: 1,
        pairArr: pairs.map(([left, right], pairIndex) => ({
            id: `${testId}-q-${index}-pair-${pairIndex + 1}`,
            items: [
                {
                    id: `${testId}-q-${index}-pair-${pairIndex + 1}-left`,
                    answerText: left,
                },
                {
                    id: `${testId}-q-${index}-pair-${pairIndex + 1}-right`,
                    answerText: right,
                },
            ],
        })),
    }
}

const getQuestionsForTest = (config: TMockTestConfig): TQuestion[] => {
    if (config.topic === "english") {
        return [
            getMultipleChoiceQuestion(
                config.id,
                1,
                "Choose the correct sentence.",
                [
                    "She go to school every day.",
                    "She goes to school every day.",
                    "She going to school every day.",
                    "She gone to school every day.",
                ],
                1,
            ),
            getTrueFalseQuestion(
                config.id,
                2,
                "The sentence 'I am usually drink coffee' is grammatically correct.",
                false,
            ),
            getShortAnswerQuestion(
                config.id,
                3,
                "Write the past simple form of 'go'.",
                ["went"],
            ),
            getMatchPairsQuestion(
                config.id,
                4,
                "Match the words with their meanings.",
                [
                    ["exhausted", "very tired"],
                    ["to doubt", "to be unsure"],
                    ["to improve", "to make better"],
                    ["to refuse", "to say no"],
                ],
            ),
            getMultipleChoiceQuestion(
                config.id,
                5,
                "Choose the correct conditional sentence.",
                [
                    "If it rains, I stay at home.",
                    "If it will rain, I stay at home.",
                    "If it rains, I will stay at home.",
                    "If it rain, I will stay at home.",
                ],
                2,
            ),
            getTrueFalseQuestion(
                config.id,
                6,
                "In English, 'will' can be used for spontaneous decisions.",
                true,
            ),
            getShortAnswerQuestion(
                config.id,
                7,
                "Translate into English: самостоятельно.",
                ["on your own", "independently"],
            ),
            getMatchPairsQuestion(
                config.id,
                8,
                "Match the tense with the example.",
                [
                    ["Present Simple", "I work every day."],
                    ["Past Simple", "I worked yesterday."],
                    ["Present Continuous", "I am working now."],
                    ["Going to", "I am going to study tonight."],
                ],
            ),
        ]
    }

    if (config.topic === "german") {
        return [
            getMultipleChoiceQuestion(
                config.id,
                1,
                "Choose the correct article: ___ Tisch.",
                ["die", "das", "der", "den"],
                2,
            ),
            getTrueFalseQuestion(
                config.id,
                2,
                "In a German main clause, the conjugated verb usually stands in position 2.",
                true,
            ),
            getShortAnswerQuestion(
                config.id,
                3,
                "Translate into German: I have time.",
                ["Ich habe Zeit."],
            ),
            getMatchPairsQuestion(
                config.id,
                4,
                "Match the German word with its meaning.",
                [
                    ["umgehend", "immediately"],
                    ["diesbezüglich", "regarding this"],
                    ["abklären", "to clarify"],
                    ["verfallen", "to expire"],
                ],
            ),
            getMultipleChoiceQuestion(
                config.id,
                5,
                "Choose the correct sentence.",
                [
                    "Ich kann heute kommen.",
                    "Ich heute kann kommen.",
                    "Ich kommen kann heute.",
                    "Heute ich kann kommen.",
                ],
                0,
            ),
            getTrueFalseQuestion(
                config.id,
                6,
                "'weil' sends the conjugated verb to the end of the subordinate clause.",
                true,
            ),
            getShortAnswerQuestion(
                config.id,
                7,
                "Translate into German: monthly gym membership.",
                ["monatlicher Fitnessstudiovertrag", "Monatsabo fürs Fitnessstudio"],
            ),
            getMatchPairsQuestion(
                config.id,
                8,
                "Match the modal verb with its meaning.",
                [
                    ["müssen", "must / have to"],
                    ["dürfen", "may / be allowed to"],
                    ["können", "can / be able to"],
                    ["wollen", "want to"],
                ],
            ),
        ]
    }

    return [
        getMultipleChoiceQuestion(
            config.id,
            1,
            "Which empire was important in medieval German history?",
            [
                "The Roman Republic",
                "The Holy Roman Empire",
                "The Byzantine Empire only",
                "The Ottoman Empire only",
            ],
            1,
        ),
        getTrueFalseQuestion(
            config.id,
            2,
            "Martin Luther was an important figure in the Reformation.",
            true,
        ),
        getShortAnswerQuestion(
            config.id,
            3,
            "Name one important German city in medieval trade.",
            ["Lübeck", "Hamburg", "Bremen", "Nürnberg", "Augsburg"],
        ),
        getMatchPairsQuestion(
            config.id,
            4,
            "Match the person or term with the description.",
            [
                ["Martin Luther", "Reformation"],
                ["Otto von Bismarck", "German unification"],
                ["Weimar Republic", "German democracy after World War I"],
                ["Berlin Wall", "Division of Germany"],
            ],
        ),
        getMultipleChoiceQuestion(
            config.id,
            5,
            "In which year was the German Empire proclaimed?",
            ["1815", "1848", "1871", "1919"],
            2,
        ),
        getTrueFalseQuestion(
            config.id,
            6,
            "Germany was divided into East and West Germany after World War II.",
            true,
        ),
        getShortAnswerQuestion(
            config.id,
            7,
            "In which year did the Berlin Wall fall?",
            ["1989"],
        ),
        getMatchPairsQuestion(
            config.id,
            8,
            "Match the historical period with the event.",
            [
                ["1517", "Luther's theses"],
                ["1871", "German unification"],
                ["1919", "Weimar Constitution"],
                ["1990", "German reunification"],
            ],
        ),
    ]
}

const getQuestionPoints = (question: TQuestion): number => {
    if (question.type === "multipleChoice") {
        return question.pointsPerAnswer
    }

    if (question.type === "trueFalse") {
        return question.pointsPerQuestion
    }

    if (question.type === "shortAnswer") {
        return question.pointsPerQuestion
    }

    if (question.type === "matchPairs") {
        return question.pointsPerAnswer * question.pairArr.length
    }

    return 0
}

const getTotalPoints = (questions: TQuestion[]): number => {
    return questions.reduce((sum, question) => {
        return sum + getQuestionPoints(question)
    }, 0)
}

const getCompletedStudentCount = (testIndex: number): number => {
    const counts = [8, 9, 10, 11, 12]

    return counts[testIndex % counts.length]
}

const cloneQuestion = <T extends TQuestion>(question: T): T => {
    return structuredClone(question)
}

const getAnsweredMultipleChoiceQuestion = (
    question: TMultipleChoiceQuestion,
    isCorrect: boolean,
): TMultipleChoiceQuestion => {
    const correctAnswerIndex = question.answerArr.findIndex((answer) => {
        return answer.isRight
    })

    const selectedAnswerIndex = isCorrect
        ? correctAnswerIndex
        : question.answerArr.findIndex((answer, index) => {
              return index !== correctAnswerIndex
          })

    return {
        ...question,
        answerArr: question.answerArr.map((answer, answerIndex) => ({
            ...answer,
            isRight: answerIndex === selectedAnswerIndex,
        })),
    }
}

const getAnsweredTrueFalseQuestion = (
    question: TTrueFalseQuestion,
    isCorrect: boolean,
): TTrueFalseQuestion => {
    const correctAnswer = question.answer

    return {
        ...question,
        answer: isCorrect ? correctAnswer : !correctAnswer,
    }
}

const getAnsweredShortAnswerQuestion = (
    question: TShortAnswerQuestion,
    isCorrect: boolean,
    studentIndex: number,
): TShortAnswerQuestion => {
    const firstCorrectAnswer = question.correctAnswerArr[0]?.answerText ?? ""

    return {
        ...question,
        correctAnswerArr: [
            {
                id: `${question.id}-student-answer`,
                answerText: isCorrect
                    ? firstCorrectAnswer
                    : `Wrong answer ${studentIndex + 1}`,
            },
        ],
    }
}

const getAnsweredMatchPairsQuestion = (
    question: TMatchPairsQuestion,
    isCorrect: boolean,
): TMatchPairsQuestion => {
    if (isCorrect) {
        return cloneQuestion(question)
    }

    const pairArr = cloneQuestion(question).pairArr

    if (pairArr.length < 2) {
        return {
            ...question,
            pairArr,
        }
    }

    const firstRightItem = pairArr[0].items[1]
    const secondRightItem = pairArr[1].items[1]

    pairArr[0].items[1] = secondRightItem
    pairArr[1].items[1] = firstRightItem

    return {
        ...question,
        pairArr,
    }
}

const getAnsweredQuestion = (
    question: TQuestion,
    studentIndex: number,
    questionIndex: number,
    testIndex: number,
): TQuestion => {
    const isCorrect = (studentIndex + questionIndex + testIndex) % 4 !== 0

    if (question.type === "multipleChoice") {
        return getAnsweredMultipleChoiceQuestion(question, isCorrect)
    }

    if (question.type === "trueFalse") {
        return getAnsweredTrueFalseQuestion(question, isCorrect)
    }

    if (question.type === "shortAnswer") {
        return getAnsweredShortAnswerQuestion(question, isCorrect, studentIndex)
    }

    if (question.type === "matchPairs") {
        return getAnsweredMatchPairsQuestion(question, isCorrect)
    }

    return cloneQuestion(question)
}

const getAnsweredQuestions = (
    questions: TQuestion[],
    studentIndex: number,
    testIndex: number,
): TQuestion[] => {
    return questions.map((question, questionIndex) => {
        return getAnsweredQuestion(
            question,
            studentIndex,
            questionIndex,
            testIndex,
        )
    })
}

const getAnsweredQuestionPoints = (
    originalQuestion: TQuestion,
    answeredQuestion: TQuestion,
): number => {
    if (originalQuestion.type !== answeredQuestion.type) {
        return 0
    }

    if (
        originalQuestion.type === "multipleChoice" &&
        answeredQuestion.type === "multipleChoice"
    ) {
        const originalCorrectAnswer = originalQuestion.answerArr.find((answer) => {
            return answer.isRight
        })

        const selectedAnswer = answeredQuestion.answerArr.find((answer) => {
            return answer.isRight
        })

        if (!originalCorrectAnswer || !selectedAnswer) {
            return 0
        }

        return originalCorrectAnswer.id === selectedAnswer.id
            ? originalQuestion.pointsPerAnswer
            : 0
    }

    if (
        originalQuestion.type === "trueFalse" &&
        answeredQuestion.type === "trueFalse"
    ) {
        return originalQuestion.answer === answeredQuestion.answer
            ? originalQuestion.pointsPerQuestion
            : 0
    }

    if (
        originalQuestion.type === "shortAnswer" &&
        answeredQuestion.type === "shortAnswer"
    ) {
        const studentAnswer =
            answeredQuestion.correctAnswerArr[0]?.answerText.trim().toLowerCase()

        const isCorrect = originalQuestion.correctAnswerArr.some((answer) => {
            return answer.answerText.trim().toLowerCase() === studentAnswer
        })

        return isCorrect ? originalQuestion.pointsPerQuestion : 0
    }

    if (
        originalQuestion.type === "matchPairs" &&
        answeredQuestion.type === "matchPairs"
    ) {
        return originalQuestion.pairArr.reduce((sum, originalPair, pairIndex) => {
            const answeredPair = answeredQuestion.pairArr[pairIndex]

            if (!answeredPair) {
                return sum
            }

            const isPairCorrect =
                originalPair.items[0].id === answeredPair.items[0].id &&
                originalPair.items[1].id === answeredPair.items[1].id

            return isPairCorrect
                ? sum + originalQuestion.pointsPerAnswer
                : sum
        }, 0)
    }

    return 0
}

const calculateResultPoints = (
    originalQuestions: TQuestion[],
    answeredQuestions: TQuestion[],
): number => {
    return originalQuestions.reduce((sum, originalQuestion, questionIndex) => {
        const answeredQuestion = answeredQuestions[questionIndex]

        if (!answeredQuestion) {
            return sum
        }

        return sum + getAnsweredQuestionPoints(originalQuestion, answeredQuestion)
    }, 0)
}

const createTest = (
    config: TMockTestConfig,
    authorId: string,
): TTest => {
    const questionArr = getQuestionsForTest(config)
    const totalPoints = getTotalPoints(questionArr)

    return {
        id: config.id,
        name: config.name,
        questionArr,
        passPoints: Math.ceil(totalPoints * 0.6),
        createdAt: "2026-05-01T10:00:00.000Z",
        updatedAt: "2026-05-01T10:00:00.000Z",
        author: authorId,
        totalPoints,
        testResultArr: [],
    }
}

const getTestResultTest = (test: TTest): TTestResultTest => {
    const { testResultArr, ...testResultTest } = test

    return testResultTest
}

const createTestResult = (
    test: TTest,
    student: TStudent,
    studentIndex: number,
    testIndex: number,
): TTestResult => {
    const answers = getAnsweredQuestions(
        test.questionArr,
        studentIndex,
        testIndex,
    )

    return {
        id: `${test.id}-result-${student.id}`,
        answers,
        completedAt: new Date(
            2026,
            testIndex % 12,
            1 + studentIndex,
            10 + (studentIndex % 7),
            15,
        ).toISOString(),
        completedBy: student,
        test: getTestResultTest(test),
        points: calculateResultPoints(test.questionArr, answers),
    }
}

const allTestResults: TTestResult[] = []

const createTestResultFolder = (
    config: TMockTestConfig,
    authorId: string,
    globalTestIndex: number,
): TTestResultFolder => {
    const test = createTest(config, authorId)
    const completedStudentCount = getCompletedStudentCount(globalTestIndex)

    const resultItems: TTestResultItem[] = mockStudents
        .slice(0, completedStudentCount)
        .map((student, studentIndex) => {
            const result = createTestResult(
                test,
                student,
                studentIndex,
                globalTestIndex,
            )

            student.testResultArr.push(result)
            test.testResultArr.push(result)
            allTestResults.push(result)

            return {
                type: "testResult",
                data: result,
            }
        })

    return {
        id: `${config.id}-results-folder`,
        name: config.name,
        children: resultItems,
    }
}

let globalTestIndex = 0

const createSubjectFolder = (
    id: string,
    name: string,
    configs: TMockTestConfig[],
    authorId: string,
): TTestResultFolder => {
    return {
        id,
        name,
        children: configs.map((config) => {
            const testFolder = createTestResultFolder(
                config,
                authorId,
                globalTestIndex,
            )

            globalTestIndex += 1

            return {
                type: "folder",
                data: testFolder,
            }
        }),
    }
}

const mockAuthor: TAuthor = {
    id: "author-1",
    role: "author",
    name: "Marko Yakovenko",
    email: "marko.author@example.com",
    testResultFolderArr: [],
    testResultArr: allTestResults,
}

mockAuthor.testResultFolderArr = [
    createSubjectFolder(
        "folder-english",
        "English",
        testConfigs.english,
        mockAuthor.id,
    ),
    createSubjectFolder(
        "folder-german",
        "German",
        testConfigs.german,
        mockAuthor.id,
    ),
    createSubjectFolder(
        "folder-german-history",
        "German History",
        testConfigs.germanHistory,
        mockAuthor.id,
    ),
]

const mockUsers: TUser[] = [
    mockAuthor,
    mockAdmin,
    ...mockStudents,
]

export {
    mockAdmin,
    mockAuthor,
    mockStudents,
    mockUsers,
}