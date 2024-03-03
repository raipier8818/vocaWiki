export interface IWord {
  id: string
  word: string,
  meaning: string,
  example: string,
  exampleMeaning: string,
}

export interface IWordsObj {
  [key: string]: IWord
}
