import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { LoginProps } from '../interface/navigation';
import { testVocabularies } from '../test/data';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ route, navigation }: LoginProps) {
  const [id, setId ] = useState<string>('')
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log(id, password);

    navigation.navigate("Home", testVocabularies);
  }

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        placeholder='ID'
        value={id}
        onChangeText={setId}
      />
      <TextInput
        placeholder='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title='Login' onPress={handleLogin} />
    </SafeAreaView>
  );
}
