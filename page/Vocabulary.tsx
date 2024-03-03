// Vocabulary.tsx

import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VocabularyProps } from '../interface/navigation';
import { testVocabularies } from '../test/data';
import { IWord, IWordsObj } from '../interface/word';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadLocalWords, saveLocalWords } from '../scripts/data';
import { AddWordsModal } from '../component/AddWordModal';
import { ShowWordModal } from '../component/ShowWordModal';
import { IWords } from '../interface/vocabulary';
import { Ionicons } from '@expo/vector-icons';

export default function Vocabulary({ route, navigation }: VocabularyProps) {
  const [isAddWordModalVisible, setIsAddWordModalVisible] = useState<boolean>(false);
  const [isShowWordModalVisible, setIsShowWordModalVisible] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const [words, setWords] = useState<IWords>({
    id: route.params.id,
    words: {}
  });

  useEffect(() => {
    loadLocalWords(route.params.id).then((value: IWords) => {
      if (!value) {
        value = {
          id: route.params.id,
          words: {}
        }
      }
      setWords(value);
    });
  }, []);

  const pushWords = (newWordsObj: IWordsObj) => {
    const newWords = Object.assign({}, words.words, newWordsObj);
    words.words = newWords;
    setWords({ ...words });
  }

  const popWord = (id: string) => {
    delete words.words[id];
    setCurrentId("")
    setWords({ ...words });
  }

  const updateWord = (id: string, word: IWord) => {
    words.words[id] = word;
    setWords({ ...words });
  }

  useEffect(() => {
    saveLocalWords(words).then(() => {

    });
  }, [words]);

  const deleteAlert = (id: string) => {
    Alert.alert(
      'Alert',
      'Delete Word?',
      [
        {
          text: 'Yes', onPress: () => { popWord(id); }, style: 'destructive'
        },
        {
          text: 'No', onPress: () => { }, style: 'cancel'
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: string }) => {
    const word = words.words[item];

    return (
      <TouchableOpacity
        onPress={() => { setIsShowWordModalVisible(true); setCurrentId(item) }}
        onLongPress={() => { deleteAlert(item) }}
        style={styles.wordContainer}
      >
        <View style={styles.wordTextContainer}>
          <Text style={styles.word}>{word.word}</Text>
          <Text style={styles.meaning}>{word.meaning}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{route.params.name}</Text>
        <TouchableOpacity
          onPress={() => setIsAddWordModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(words.words).length === 0 && (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No words found in this vocabulary.</Text>
          <Button title='Add Word' onPress={() => setIsAddWordModalVisible(true)} />
        </View>
      )}
      {Object.keys(words.words).length > 0 && (
        <FlatList
          data={Object.keys(words.words)}
          renderItem={renderItem}
        />
      )}
      <AddWordsModal
        isVisible={isAddWordModalVisible}
        setIsVisible={setIsAddWordModalVisible}
        pushWords={pushWords}
        vocabulary={route.params}
      />
      {
        currentId == "" ?
          <></> :
          <ShowWordModal
            currentId={currentId}
            isVisible={isShowWordModalVisible}
            setIsVisible={setIsShowWordModalVisible}
            wordObj={words.words}
            updateWord={updateWord}
          />
      }
      <Button title='Home' onPress={() => { navigation.navigate("Home", testVocabularies) }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  wordContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  wordTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meaning: {
    fontSize: 16,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
