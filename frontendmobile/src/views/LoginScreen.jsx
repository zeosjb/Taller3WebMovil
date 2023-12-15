import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Ingrese un correo válido").required("El correo es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria"),
  });

  const handleLogin = (values) => {
    signIn(values.email, values.password);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image source={require("../assets/MobileHub.png")} style={styles.image} />
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
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
                  Iniciar sesión
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
    marginBottom: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
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

export default LoginScreen;
