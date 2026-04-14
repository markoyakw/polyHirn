type TQuestionType =
  | "multipleChoice"
  | "trueFalse"
  | "connectPairs"
  | "shortAnswer";

type TBaseQuestion = {
  id: string;
  type: TQuestionType;
  questionText: string;
};

type TMultipleChoiceAnswer = {
  id: string;
  answerText: string;
  isRight: boolean;
};

type TMultipleChoiceQuestion = TBaseQuestion & {
  type: "multipleChoice";
  answerArr: TMultipleChoiceAnswer[];
};

type TTrueFalseQuestion = TBaseQuestion & {
  type: "trueFalse";
  correctAnswer: boolean | null;
};

type TConnectPairsQuestionItem = {
  id: string;
  leftText: string;
  rightText: string;
};

type TConnectPairsQuestion = TBaseQuestion & {
  type: "connectPairs";
  pairArr: TConnectPairsQuestionItem[];
};

type TShortAnswerQuestion = TBaseQuestion & {
  type: "shortAnswer";
  correctAnswerArr: string[];
};

type TQuestion =
    | TMultipleChoiceQuestion
    | TTrueFalseQuestion
    | TConnectPairsQuestion
    | TShortAnswerQuestion

type TTest = {
    timeLimit?: number
    passMark: number
    name: string
    questionArr: TQuestion[]
}

export type {
    TConnectPairsQuestion,
    TConnectPairsQuestionItem,
    TMultipleChoiceAnswer,
    TMultipleChoiceQuestion,
    TQuestion,
    TQuestionType,
    TShortAnswerQuestion,
    TTest,
    TTrueFalseQuestion,
}
