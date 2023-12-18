import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

/**
 * Schema de Yup para las validaciones
 */
const EditProfileSchema = yup.object().shape({
  newUsername: yup.string().required("El nombre de usuario es obligatorio"),
  newEmail: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  newDateOfBirth: yup.date().required("La fecha de nacimiento es obligatoria"),
});

/**
 * Muestra un modal para editar el perfil del usuario.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.isVisible - Indica si el modal está visible.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {object} props.user - Información del usuario a ser editado.
 * @param {function} props.onEditProfile - Función para actualizar el perfil del usuario.
 * @returns {JSX.Element} Componente EditProfile.
 */
const EditProfile = ({ isVisible, onClose, user, onEditProfile }) => {
  /**
   * Maneja el evento de guardar cambios en el perfil.
   *
   * @param {object} values - Valores del formulario.
   * @param {string} values.newEmail - Nuevo correo electrónico.
   * @param {string} values.newUsername - Nuevo nombre de usuario.
   * @param {string} values.newDateOfBirth - Nueva fecha de nacimiento.
   */
  const handleSaveChanges = (values) => {
    onEditProfile(values.newEmail, values.newUsername, values.newDateOfBirth);
    onClose();
  };

  /**
   * Formatea una fecha completa eliminando la parte de la hora.
   *
   * @param {string} fullDate - Fecha completa en formato ISO.
   * @returns {string} Fecha formateada (solo la parte de la fecha).
   */
  const formatDate = (fullDate) => {
    return fullDate.substring(0, fullDate.indexOf('T'));
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
                mode="outlined"
                theme={{ colors: { primary: "black", text: "black" } }}
              />
              <HelperText
                type="error"
                visible={errors.newUsername !== undefined}
                style={{ color: "black" }}
              >
                {errors.newUsername}
              </HelperText>
              <TextInput
                label="Nuevo correo electrónico"
                value={values.newEmail}
                onChangeText={handleChange("newEmail")}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: "black", text: "black" } }}
              />
              <HelperText
                type="error"
                visible={errors.newEmail !== undefined}
                style={{ color: "black" }}
              >
                {errors.newEmail}
              </HelperText>
              <TextInput
                label="Fecha de nacimiento (YYYY-MM-DD)"
                value={formatDate(values.newDateOfBirth)}
                onChangeText={handleChange("newDateOfBirth")}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: "black", text: "black" } }}
              />
              <HelperText
                type="error"
                visible={errors.newDateOfBirth !== undefined}
                style={{ color: "black" }}
              >
                {errors.newDateOfBirth}
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
                style={[styles.button, { borderColor: "black", color: "black" }]}
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

export default EditProfile;
