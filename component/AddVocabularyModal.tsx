// AddVocabularyModal.tsx

import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IVocabulary, language } from "../interface/vocabulary";
import uuid from "react-uuid";

interface AddVocabularyModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  pushVocabulary: (vocabulary: IVocabulary) => void;
}

export const AddVocabularyModal = (props: AddVocabularyModalProps) => {
  const [name, setName] = useState<string>("");
  const [wordLanguage, setWordLanguage] = useState<language>("en");
  const [meaningLanguage, setMeaningLanguage] = useState<language>("ko");

  const addBtnHandler = () => {
    if (!name) return;
    const newVocabulary: IVocabulary = {
      id: uuid(),
      name: name,
      wordLanguage: wordLanguage,
      meaningLanguage: meaningLanguage,
      size: 0
    };
    props.pushVocabulary(newVocabulary);
    props.setIsVisible(false);
    resetStates();
  };

  const resetStates = () => {
    setName("");
    setWordLanguage("en");
    setMeaningLanguage("ko");
  };

  const cancelBtnHandler = () => {
    props.setIsVisible(false);
    resetStates();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={props.isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Vocabulary</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setName}
            value={name}
          />
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Word Language</Text>
              <Picker
                selectedValue={wordLanguage}
                onValueChange={(itemValue) => setWordLanguage(itemValue)}
                style={styles.picker}
                itemStyle={{ height: 40 }}
                
              >
                <Picker.Item label="Korean" value="ko" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Japanese" value="jp" />
              </Picker>
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Meaning Language</Text>
              <Picker
                selectedValue={meaningLanguage}
                onValueChange={(itemValue) => setMeaningLanguage(itemValue)}
                style={styles.picker}
                itemStyle={{ height: 40 }}
              >
                <Picker.Item label="Korean" value="ko" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Japanese" value="jp" />
              </Picker>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={addBtnHandler} />
            <Button title="Cancel" onPress={cancelBtnHandler} />
          </View>
        </View>
      </View>
    </Modal>
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
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
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
  pickerContainer: {
    width: "100%",
    marginBottom: 10,
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 12,
  },
  picker: {
    width: "65%",
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default AddVocabularyModal;
