import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

const EditProfileSchema = yup.object().shape({
  newUsername: yup.string().required("El nombre de usuario es obligatorio"),
  newEmail: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  newDateOfBirth: yup.date().required("La fecha de nacimiento es obligatoria"),
});

const EditProfile = ({ isVisible, onClose, user, onEditProfile }) => {
  const handleSaveChanges = (values) => {
    onEditProfile(values.newEmail, values.newUsername, values.newDateOfBirth);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Formik
          initialValues={{
            newUsername: user?.name || "",
            newEmail: user?.email || "",
            newDateOfBirth: user?.birthDate || "",
          }}
          validationSchema={EditProfileSchema}
          onSubmit={(values) => handleSaveChanges(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <TextInput
                label="Nuevo nombre de usuario"
                value={values.newUsername}
                onChangeText={handleChange("newUsername")}
                style={styles.input}
              />
              <HelperText
                type="error"
                visible={errors.newUsername !== undefined}
              >
                {errors.newUsername}
              </HelperText>
              <TextInput
                label="Nuevo correo electrónico"
                value={values.newEmail}
                onChangeText={handleChange("newEmail")}
                style={styles.input}
              />
              <HelperText type="error" visible={errors.newEmail !== undefined}>
                {errors.newEmail}
              </HelperText>
              <TextInput
                label="Fecha de nacimiento (YYYY-MM-DD)"
                value={values.newDateOfBirth}
                onChangeText={handleChange("newDateOfBirth")}
                style={styles.input}
              />
              <HelperText
                type="error"
                visible={errors.newDateOfBirth !== undefined}
              >
                {errors.newDateOfBirth}
              </HelperText>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
              >
                Guardar Cambios
              </Button>
              <Button mode="outlined" onPress={onClose} style={styles.button}>
                Cancelar
              </Button>
            </>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
  button: {
    marginTop: 10,
  },
});

export default EditProfile;