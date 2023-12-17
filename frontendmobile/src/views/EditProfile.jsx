import React, { useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../context/AuthContext';

const EditProfile = () => {
  const { user, editProfile } = useContext(AuthContext);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newName, setNewName] = useState(user.name);
  const [newBirthDate, setNewBirthDate] = useState(user.birthDate);

  const profileValidationSchema = yup.object().shape({
    newEmail: yup.string().email('Ingrese un correo válido').required('El correo es obligatorio'),
    newName: yup.string().required('El nombre es obligatorio'),
    newBirthDate: yup.string().required('La fecha de nacimiento es obligatoria'),
  });

  const handleSave = (values) => {
    Keyboard.dismiss();
    editProfile(user.id, values.newEmail, values.newName, values.newBirthDate);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Perfil</Text>
          <Formik
            validationSchema={profileValidationSchema}
            initialValues={{ newEmail, newName, newBirthDate }}
            onSubmit={handleSave}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
            }) => (
              <>
                <TextInput
                  label="Nuevo Correo electrónico"
                  name="newEmail"
                  onChangeText={handleChange('newEmail')}
                  onBlur={handleBlur('newEmail')}
                  value={values.newEmail}
                  keyboardType="email-address"
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.newEmail && touched.newEmail && (
                  <Text style={styles.errorText}>{errors.newEmail}</Text>
                )}
                <TextInput
                  label="Nuevo Nombre"
                  name="newName"
                  onChangeText={handleChange('newName')}
                  onBlur={handleBlur('newName')}
                  value={values.newName}
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.newName && touched.newName && (
                  <Text style={styles.errorText}>{errors.newName}</Text>
                )}
                <TextInput
                  label="Nuevo Año de Nacimiento"
                  name="newBirthDate"
                  onChangeText={handleChange('newBirthDate')}
                  onBlur={handleBlur('newBirthDate')}
                  value={values.newBirthDate}
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.newBirthDate && touched.newBirthDate && (
                  <Text style={styles.errorText}>{errors.newBirthDate}</Text>
                )}
                <Button
                  mode="contained"
                  style={[styles.button, !isValid && styles.disabledButton]}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  Guardar Cambios
                </Button>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: 300,
    marginBottom: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    width: 300,
    backgroundColor: 'black',
  },
  disabledButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default EditProfile;
