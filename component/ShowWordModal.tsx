import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IWord, IWordsObj } from "../interface/word";
import EditWordModal from "./EditWordModal";

interface ShowWordModalProps {
  currentId: string;
  wordObj: IWordsObj;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  updateWord: (id: string, word: IWord) => void;
}

export const ShowWordModal = (props: ShowWordModalProps) => {
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

  const closeBtnHandler = () => {
    props.setIsVisible(false);
  };

  const editBtnHandler = () => {
    props.setIsVisible(false);
    setIsEditVisible(true);
  };

  const renderWordModal = () => {
    const currentWord = props.wordObj[props.currentId];

    return (
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{currentWord.word}</Text>
          <Text>{currentWord.meaning}</Text>
          <Text>{currentWord.example}</Text>
          <Text>{currentWord.exampleMeaning}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={editBtnHandler} />
            <Button title="Close" onPress={closeBtnHandler} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal animationType="fade" visible={props.isVisible} transparent>
        {renderWordModal()}
      </Modal>
      <EditWordModal
        isVisible={isEditVisible}
        setIsVisible={setIsEditVisible}
        wordId={props.currentId}
        wordObj={props.wordObj[props.currentId]}
        updateWord={props.updateWord}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default ShowWordModal;
