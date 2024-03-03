import { IWord, IWordsObj } from "./word";

export interface IVocabulary {
  id: string,
  name: string,
  wordLanguage: language,
  meaningLanguage: language
  size: number,
}

export interface IWords{
  id: string
  words: IWordsObj
}

export interface IVocabularyObj {
  [key: string]: IVocabulary
}

export type language = 'ko' | 'en' | 'jp';