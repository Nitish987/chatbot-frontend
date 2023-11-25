interface ChatbotType {
  name: string;
  types: string[];
  typesDesc: { [type: string]: string };
  engines: string[];
  models: { [model: string]: string[] };
}

interface EmFormsType {
  name: string;
  types: string[];
  typesDesc: { [type: string]: string };
}

const Chatbot = Object.freeze({
  name: 'CHATBOT',
  types: ['QNA', 'AI'],
  typesDesc: {
    QNA: 'Questions & Answers',
    AI: 'AI Language Model',
  },
  engines: ['C-QnA', 'OpenAI-ChatGPT', 'Google-Bard'],
  models: {
    'C-QnA': ['C-QnA'],
    'OpenAI-ChatGPT': ['gpt-3.5-turbo'],
    'Google-Bard': ['Palm-2'],
  },
});

const Emforms = Object.freeze({
  name: 'EMFORMS',
  types: ['JSON', 'MULTIPART'],
  typesDesc: {
    JSON: 'Json Body',
    MULTIPART: 'Multipart Body',
  },
  models: [],
});

export class Product {
  static chatbot: ChatbotType = Chatbot;
  static emforms: EmFormsType = Emforms;
  static products: any[] = [Chatbot, Emforms];
  static productTypes: { [type: string]: string } = {
    ...Chatbot.typesDesc,
    ...Emforms.typesDesc,
  };
}
