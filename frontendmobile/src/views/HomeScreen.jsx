import React, { useContext } from "react";
import { Text, View, Button } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View>
      <Header />
      <Text>HomeScreen</Text>
      <Button
        title="Ir a Editar Perfil"
        onPress={navigateToEditProfile}
      />
    </View>
  );
};

export default HomeScreen;
