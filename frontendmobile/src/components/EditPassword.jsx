import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

const EditPasswordSchema = yup.object().shape({
  newPassword: yup.string().required("La nueva contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
    .required("Confirma la nueva contraseña"),
});

const EditPassword = ({ isVisible, onClose, onUpdatePassword }) => {
  const handleSaveChanges = (values) => {
    onUpdatePassword(values.newPassword);
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
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={EditPasswordSchema}
          onSubmit={(values) => handleSaveChanges(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <>
              <TextInput
                label="Nueva contraseña"
                secureTextEntry
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: "black", text: "black" } }}
              />
              <HelperText
                type="error"
                visible={errors.newPassword !== undefined}
                style={{ color: "black" }}
              >
                {errors.newPassword}
              </HelperText>
              <TextInput
                label="Confirmar nueva contraseña"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: "black", text: "black" } }}
              />
              <HelperText
                type="error"
                visible={errors.confirmPassword !== undefined}
                style={{ color: "black" }}
              >
                {errors.confirmPassword}
              </HelperText>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={[styles.button, { backgroundColor: "black" }]}
              >
                Guardar Cambios
              </Button>
              <Button
                mode="outlined"
                onPress={onClose}
                style={[
                  styles.button,
                  { borderColor: "black", color: "black" },
                ]}
              >
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
    backgroundColor: "white",
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
  button: {
    marginTop: 10,
    width: "100%",
  },
});

export default EditPassword;