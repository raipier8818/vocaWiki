// EditWordModal.tsx

import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { IWord } from "../interface/word";

interface EditWordModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  wordId: string;
  wordObj: IWord;
  updateWord: (wordId: string, updatedWord: IWord) => void;
}

export const EditWordModal = (props: EditWordModalProps) => {
  const [word, setWord] = useState<string>(props.wordObj.word);
  const [meaning, setMeaning] = useState<string>(props.wordObj.meaning);
  const [example, setExample] = useState<string>(props.wordObj.example);
  const [exampleMeaning, setExampleMeaning] = useState<string>(props.wordObj.exampleMeaning);

  const updateBtnHandler = () => {
    const updatedWord: IWord = {
      id: props.wordId,
      word: word,
      meaning: meaning,
      example: example,
      exampleMeaning: exampleMeaning,
    };
    props.updateWord(props.wordId, updatedWord);
    props.setIsVisible(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Word</Text>
          <TextInput
            style={styles.input}
            placeholder="Word"
            onChangeText={setWord}
            value={word}
          />
          <TextInput
            style={styles.input}
            placeholder="Meaning"
            onChangeText={setMeaning}
            value={meaning}
          />
          <TextInput
            style={styles.input}
            placeholder="Example"
            onChangeText={setExample}
            value={example}
          />
          <TextInput
            style={styles.input}
            placeholder="Example Meaning"
            onChangeText={setExampleMeaning}
            value={exampleMeaning}
          />
          <View style={styles.buttonContainer}>
            <Button title="Update" onPress={updateBtnHandler} />
            <Button title="Cancel" onPress={() => props.setIsVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalView: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default EditWordModal;
