import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { IVocabulary, IVocabularyObj, IWords } from "./vocabulary";

export type RootStackParams = {
  Login: undefined,
  Home: IVocabularyObj,
  Vocabulary: IVocabulary
}

export type LoginProps = NativeStackScreenProps<RootStackParams, "Login">;
export type HomeProps = NativeStackScreenProps<RootStackParams, "Home">;
export type VocabularyProps = NativeStackScreenProps<RootStackParams, "Vocabulary">;
