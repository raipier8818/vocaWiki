import AsyncStorage from "@react-native-async-storage/async-storage"
import { IVocabulary, IVocabularyObj, IWords, language } from "../interface/vocabulary"
import uuid from 'react-uuid';
import { IWord, IWordsObj } from "../interface/word";

const vocabularyListKeyword = "Vocabularies"

// 단어장 리스트 모두 불러오기
export const loadLocalVocabularies = async () => {
  try {
    const vocabularyList = await AsyncStorage.getItem(vocabularyListKeyword);
    if (!!vocabularyList) {
      return JSON.parse(vocabularyList);
    } else {
      return {};
    }
  } catch (err) {
    console.log(err);
  }
}

// 단어장 리스트 모두 저장하기
export const saveLocalVocabularies = async (vocabularies: IVocabularyObj) => {
  
  try {
    return await AsyncStorage.setItem(vocabularyListKeyword, JSON.stringify(vocabularies));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

// 해당되는 단어 모두 불러오기
export const loadLocalWords = async (id:string) => {
  try {
    const data = await AsyncStorage.getItem(id);
    if (!!data) {
      return JSON.parse(data);
    } else {
      return undefined;
    }
  } catch (err)
  {
    console.log(err);
    return undefined;
  }
}

// 해당되는 단어 모두 저장
export const saveLocalWords = async (words: IWords) => {
  try {
    return await AsyncStorage.setItem(words.id, JSON.stringify(words));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const deleteLocalWords = async (id: string) => {
  try {
    return await AsyncStorage.removeItem(id);
  } catch (err) {
    console.log(err);
    return;
  }
}

export const createVocabulary = (name: string, wordLanguage: language, meaningLanguage: language) => {
  const vocabularyId = uuid();
  const newVocabulary:IVocabulary = {
    id: vocabularyId,
    name: name,
    wordLanguage: wordLanguage,
    meaningLanguage: meaningLanguage,
    size: 0,
  }

  return newVocabulary;
}