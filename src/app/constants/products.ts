interface ChatbotType {
  name: string;
  types: string[];
  typesDesc: { [type: string]: string };
  engines: string[];
  models: { [model: string]: string[] };
  price: number;
}

interface EmFormsType {
  name: string;
  types: string[];
  typesDesc: { [type: string]: string };
  price: number;
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
  price: 0.15
});

const Emforms = Object.freeze({
  name: 'EMFORMS',
  types: ['JSON', 'MULTIPART'],
  typesDesc: {
    JSON: 'Json Body',
    MULTIPART: 'Multipart Body',
  },
  models: [],
  price: 1
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
