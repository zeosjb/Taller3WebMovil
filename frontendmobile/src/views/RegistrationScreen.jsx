import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";

const RegistrationScreen = () => {
  const { signUp } = useContext(AuthContext);

  const registrationValidationSchema = yup.object().shape({
    email: yup.string().email("Ingrese un correo válido").required("El correo es obligatorio"),
    name: yup.string().required("El nombre es obligatorio"),
    rut: yup.string().required("El RUT es obligatorio"),
    birthdate: yup.date().required("La fecha de nacimiento es obligatoria"),
    password: yup.string().required("La contraseña es obligatoria"),
  });

  const handleRegistration = (values) => {
    signUp(values.email, values.name, values.rut, values.birthdate, values.password);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image source={require("../assets/MobileHub.png")} style={styles.image} />
          <Formik
            validationSchema={registrationValidationSchema}
            initialValues={{ email: "", name: "", rut: "", birthdate: "", password: "" }}
            onSubmit={handleRegistration}
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
                  label="Correo electrónico"
                  name="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  label="Nombre completo"
                  name="name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <TextInput
                  label="RUT"
                  name="rut"
                  onChangeText={handleChange("rut")}
                  onBlur={handleBlur("rut")}
                  value={values.rut}
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.rut && touched.rut && (
                  <Text style={styles.errorText}>{errors.rut}</Text>
                )}

                <TextInput
                  label="Fecha de nacimiento"
                  name="birthdate"
                  onChangeText={handleChange("birthdate")}
                  onBlur={handleBlur("birthdate")}
                  value={values.birthdate}
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.birthdate && touched.birthdate && (
                  <Text style={styles.errorText}>{errors.birthdate}</Text>
                )}

                <TextInput
                  label="Contraseña"
                  name="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  style={styles.textInput}
                  theme={{ colors: { primary: 'black', underlineColor: 'transparent' } }}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Button
                  mode="contained"
                  style={[styles.button, !isValid && styles.disabledButton]}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  Registrarse
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
  textInput: {
    width: 300,
    marginBottom: 12,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "cover",
  },
});

export default RegistrationScreen;
