import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, StyleSheet, Alert, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";

import Header from "../components/Header";
import RepositoryCard from "../components/RepositoryCard";
import EditProfile from "../components/EditProfile";
import EditPassword from "../components/EditPassword";

import userApi from "../api/userApi";

const HomeScreen = () => {
  const [repositoriesObtained, setRepositoriesObtained] = useState([]);
  const { user, token, logOut } = useContext(AuthContext);

  const [isEditProfileModalVisible, setEditProfileModalVisible] =
    useState(false);

  const [isEditPasswordModalVisible, setEditPasswordModalVisible] =
    useState(false);

  const openEditProfileModal = () => {
    setEditProfileModalVisible(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalVisible(false);
  };

  const openEditPasswordModal = () => {
    setEditPasswordModalVisible(true);
  };

  const closeEditPasswordModal = () => {
    setEditPasswordModalVisible(false);
  };

  const handleEditProfile = async (newEmail, newName, newBirthDate) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await userApi.put(
        `auth/user/editprofile/${user._id}`,
        {
          name: newName,
          email: newEmail,
          birthDate: newBirthDate,
        },
        config
      );

      if (response.status === 200) {
        closeEditProfileModal();
        Alert.alert(
          "Perfil actualizado",
          "Tu perfil se ha actualizado correctamente."
        );
      } else {
        Alert.alert(
          "Error",
          "Hubo un problema al actualizar tu perfil. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al actualizar tu perfil. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleUpdatePassword = async (newPassword) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await userApi.put(
        `auth/user/resetpassword/${user._id}`,
        {
          password: newPassword,
        },
        config
      );

      if (response.status === 200) {
        closeEditPasswordModal();
        Alert.alert(
          "Contraseña actualizada",
          "Tu contraseña se ha actualizado correctamente."
        );
      } else {
        Alert.alert(
          "Error",
          "Hubo un problema al actualizar tu contraseña. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al actualizar tu contraseña. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleSignOut = () => {
    logOut();
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await userApi.get("github/repos");
        if (response.status === 200) {
          setRepositoriesObtained(response.data.repositories);
        }
      } catch (error) {
        Alert.alert("Error fetching repositories:", error.message);
        handleRequestError();
      }
    };

    fetchRepositories();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        {Array.isArray(repositoriesObtained) &&
          repositoriesObtained.map((repo, index) => (
            <RepositoryCard key={index} repository={repo} />
          ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonColumn}>
          <IconButton
            icon={() => <MaterialIcons name="edit" size={24} color="white" />}
            onPress={openEditProfileModal}
            style={styles.button}
          />
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </View>
        <View style={styles.buttonColumn}>
          <IconButton
            icon={() => (
              <MaterialIcons name="vpn-key" size={24} color="white" />
            )}
            onPress={openEditPasswordModal}
            style={styles.button}
          />
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </View>
        <View style={styles.buttonColumn}>
          <IconButton
            icon={() => (
              <MaterialIcons name="exit-to-app" size={24} color="white" />
            )}
            onPress={handleSignOut}
            style={styles.button}
          />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </View>
      </View>
      <EditProfile
        isVisible={isEditProfileModalVisible}
        onClose={closeEditProfileModal}
        user={user}
        onEditProfile={handleEditProfile}
      />
      <EditPassword
        isVisible={isEditPasswordModalVisible}
        onClose={closeEditPasswordModal}
        onUpdatePassword={handleUpdatePassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    backgroundColor: "black",
  },
  buttonColumn: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#000000",
  },
  buttonText: {
    color: "white",
    marginTop: 2,
  },
});

export default HomeScreen;
