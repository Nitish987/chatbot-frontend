interface ProductItem {
  name: string;
  types: string[];
  typesDesc: {[type: string]: string};
}

const Chatbot = Object.freeze({
  'name': 'CHATBOT',
  'types': ['QNA', 'CHATGPT'],
  'typesDesc': {
    'QNA': 'Questions & Answers',
    'CHATGPT': 'ChatGPT',
  }
});

const Emforms = Object.freeze({
  'name': 'EMFORMS',
  'types': ['JSON', 'MULTIPART'],
  'typesDesc': {
    'JSON': 'Json Body',
    'MULTIPART': 'Multipart Body',
  }
});

export class Product {
  static chatbot: ProductItem = Chatbot;
  static emforms: ProductItem = Emforms;
  static products: ProductItem[] = [Chatbot, Emforms];
}
