import React, { useState, useContext } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

import { AuthContext } from "../context/AuthContext";

import Header from "../components/Header";
import RepositoryCard from "../components/RepositoryCard";
import EditProfile from "../components/EditProfile";
import EditPassword from "../components/EditPassword";

import userApi from "../api/userApi";

const HomeScreen = () => {
  const { user, token } = useContext(AuthContext);

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

      const response = await userApi.put(`/editprofile/${user._id}`, {
        name: newName,
        email: newEmail,
        birthDate: newBirthDate,
      }, config);

      if (response.status === 200) {
        closeEditProfileModal();
        Alert.alert("Perfil actualizado", "Tu perfil se ha actualizado correctamente.");
      } else {
        Alert.alert("Error", "Hubo un problema al actualizar tu perfil. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al actualizar tu perfil. Por favor, inténtalo de nuevo.");
    }
  };

  const handleUpdatePassword = async (newPassword) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await userApi.put(`/resetpassword/${user._id}`, {
        password: newPassword,
      }, config);

      if (response.status === 200) {
        closeEditPasswordModal();
        Alert.alert("Contraseña actualizada", "Tu contraseña se ha actualizado correctamente.");
      } else {
        Alert.alert("Error", "Hubo un problema al actualizar tu contraseña. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al actualizar tu contraseña. Por favor, inténtalo de nuevo.");
    }
  };

  const repositories = [
    {
      name: "Repo 1",
      created_at: "2023-01-01",
      updated_at: "2023-01-10",
      commits_count: 5,
      commits: [
        {
          sha: "123abc",
          author: "John Doe",
          message: "Initial commit",
          date: "2023-01-01T12:00:00Z",
        },
        // Agrega más commits según sea necesario
      ],
    },
    {
      name: "Repo 2",
      created_at: "2023-02-01",
      updated_at: "2023-02-15",
      commits_count: 10,
      commits: [
        {
          sha: "456def",
          author: "Jane Smith",
          message: "Fix issue #1",
          date: "2023-02-05T15:30:00Z",
        },
        // Agrega más commits según sea necesario
      ],
    },
    // ... más repositorios
  ];

  return (
    <View style={styles.container}>
      <Header />
      {repositories.map((repo, index) => (
        <RepositoryCard key={index} repository={repo} />
      ))}
      <Button title="Editar Perfil" onPress={openEditProfileModal} />
      <Button title="Cambiar Contraseña" onPress={openEditPasswordModal} />
      <EditProfile
        isVisible={isEditProfileModalVisible}
        onClose={closeEditProfileModal}
        user={user} 
        onEditProfile={handleEditProfile}
      />
      <EditPassword  // Agregado
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
});

export default HomeScreen;
