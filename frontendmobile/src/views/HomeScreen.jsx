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

/**
 * HomeScreen
 *
 * Pantalla principal de la aplicación cuando el usuario está autenticado.
 * Muestra información del usuario, permite editar su perfil, cambiar la contraseña, cerrar sesión y muestra
 * una lista de repositorios obtenidos del API de GitHub.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa la interfaz de la pantalla principal.
 */
const HomeScreen = () => {
  const [repositoriesObtained, setRepositoriesObtained] = useState([]);
  const { user, token, logOut } = useContext(AuthContext);

  const [isEditProfileModalVisible, setEditProfileModalVisible] =
    useState(false);

  const [isEditPasswordModalVisible, setEditPasswordModalVisible] =
    useState(false);

    /**
   * Función para abrir el modal de edición de perfil.
   * @function
   */
  const openEditProfileModal = () => {
    setEditProfileModalVisible(true);
  };

  /**
   * Función para cerrar el modal de edición de perfil.
   * @function
   */
  const closeEditProfileModal = () => {
    setEditProfileModalVisible(false);
  };

  /**
   * Función para abrir el modal de cambio de contraseña.
   * @function
   */
  const openEditPasswordModal = () => {
    setEditPasswordModalVisible(true);
  };

  /**
   * Función para cerrar el modal de cambio de contraseña.
   * @function
   */
  const closeEditPasswordModal = () => {
    setEditPasswordModalVisible(false);
  };

  /**
   * Función para manejar la actualización del perfil del usuario.
   *
   * @async
   * @function
   * @param {string} newEmail - Nuevo correo electrónico del usuario.
   * @param {string} newName - Nuevo nombre del usuario.
   * @param {string} newBirthDate - Nueva fecha de nacimiento del usuario.
   */
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

  /**
   * Función para manejar la actualización de la contraseña del usuario.
   *
   * @async
   * @function
   * @param {string} newPassword - Nueva contraseña del usuario.
   */
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

  /**
   * Función para manejar el cierre de sesión del usuario.
   * @function
   */
  const handleSignOut = () => {
    logOut();
  };

  /**
   * Efecto de montaje para cargar la lista de repositorios al cargar la pantalla.
   * @effect
   */
  useEffect(() => {
    /**
     * Función asincrónica para realizar la petición al API de GitHub y obtener la lista de repositorios.
     *
     * @async
     * @function
     */
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
