import React, { useState, useRef } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View, Animated } from "react-native";
import uuid from "react-uuid";
import { IVocabulary } from "../interface/vocabulary";
import { IWord, IWordsObj } from "../interface/word";

interface AddWordsModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  vocabulary: IVocabulary;
  pushWords: (words: IWordsObj) => void;
}

export const AddWordsModal = (props: AddWordsModalProps) => {
  const [wordsObj, setWordsObj] = useState<IWordsObj>({});
  const [word, setWord] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [example, setExample] = useState<string>("");
  const [exampleMeaning, setExampleMeaning] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const opacityValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    setShowPopup(true);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(fadeOut, 1500);
    });
  };

  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
    });
  };

  const finishBtnHandler = () => {
    clearStates();
    props.pushWords(wordsObj);
    setWordsObj({});
    props.setIsVisible(false);
  };

  const clearStates = () => {
    setWord("");
    setMeaning("");
    setExample("");
    setExampleMeaning("");
  };

  const addBtnHandler = () => {
    if (!word || !meaning) {
      return;
    }

    const newWord: IWord = {
      id: uuid(),
      word: word,
      meaning: meaning,
      example: example,
      exampleMeaning: exampleMeaning
    };

    wordsObj[++props.vocabulary.size] = newWord;
    setWordsObj({ ...wordsObj });
    clearStates();
    fadeIn(); // Add 버튼을 누를 때마다 페이드 인 효과 적용
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Word</Text>
          <TextInput
            style={styles.input}
            placeholder="Word"
            placeholderTextColor="grey"
            onChangeText={setWord}
            value={word}
          />
          <TextInput
            style={styles.input}
            placeholder="Meaning"
            placeholderTextColor="grey"
            onChangeText={setMeaning}
            value={meaning}
          />
          <TextInput
            style={styles.input}
            placeholder="Example"
            placeholderTextColor="grey"
            onChangeText={setExample}
            value={example}
          />
          <TextInput
            style={styles.input}
            placeholder="Example Meaning"
            placeholderTextColor="grey"
            onChangeText={setExampleMeaning}
            value={exampleMeaning}
          />

          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={addBtnHandler} />
            <Button title="Finish" onPress={finishBtnHandler} />
          </View>
        </View>
      </View>
      {showPopup && (
        <Animated.View style={[styles.popupContainer, { opacity: opacityValue }]}>
          <Text style={styles.popupText}>Word added!</Text>
        </Animated.View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  modalView: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: "80%"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20
  },
  popupContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  popupText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default AddWordsModal;
