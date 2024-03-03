import React, { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddVocabularyModal } from '../component/AddVocabularyModal';
import { IVocabulary, IVocabularyObj } from '../interface/vocabulary';
import { HomeProps } from '../interface/navigation';
import { deleteLocalWords, loadLocalVocabularies, saveLocalVocabularies } from '../scripts/data';

export default function Home({ route, navigation }: HomeProps) {
  const [vocabularies, setVocabularies] = useState<IVocabularyObj>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>("");

  const opacityValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const pushVocabulary = (vocabulary: IVocabulary) => {
    vocabularies[vocabulary.id] = vocabulary;
    setVocabularies({ ...vocabularies });
  }

  const popVocabulary = (id: string) => {
    delete vocabularies[id];
    deleteLocalWords(id).then(() => {
      setVocabularies({ ...vocabularies });
    });
  }

  const deleteAlert = (id: string) => {
    Alert.alert(
      'Delete Vocabulary?',
      'Are you sure you want to delete this vocabulary?',
      [
        {
          text: 'Yes', onPress: () => { popVocabulary(id) }, style: 'destructive'
        },
        {
          text: 'No', onPress: () => { }, style: 'cancel'
        },
      ]
    );
  };

  useEffect(() => {
    loadLocalVocabularies().then(value => {
      setVocabularies(value);
    });
  }, []);

  useEffect(() => {
    if (saveSuccessMessage !== "") {
      fadeIn(); // 페이드 인 효과 적용
      setTimeout(() => {
        fadeOut(); // 3초 후에 페이드 아웃 효과 적용
        setSaveSuccessMessage(""); // 메시지 초기화
      }, 3000);
    }
  }, [saveSuccessMessage]);

  const renderItem = ({ item }: { item: IVocabulary }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => { navigation.navigate("Vocabulary", item) }}
      onLongPress={() => { deleteAlert(item.id) }}
    >
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  )

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerText}>VocaWiki</Text>
        <TouchableOpacity style={styles.addButton} onPress={onPressModalOpen}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {Object.values(vocabularies).length === 0 ? (
        <View style={styles.noVocabularies}>
          <Text>No vocabularies</Text>
        </View>
      ) : (
        <FlatList
          data={Object.values(vocabularies)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <AddVocabularyModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        pushVocabulary={pushVocabulary}
      />
      {saveSuccessMessage !== "" && (
        <Animated.View style={[styles.saveSuccessMessageContainer, { opacity: opacityValue }]}>
          <Text style={styles.saveSuccessMessage}>{saveSuccessMessage}</Text>
        </Animated.View>
      )}
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
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
  },
  noVocabularies: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveSuccessMessageContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveSuccessMessage: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
