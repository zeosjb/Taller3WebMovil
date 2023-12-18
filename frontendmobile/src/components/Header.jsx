// Header.js
import React from 'react';
import { Appbar } from 'react-native-paper';

/**
 * Muestra el header de la aplicación con su nombre "Mobile Hub"
 * 
 * @returns El header con el nombre de la aplicación
 */
const Header = () => {

  return (
    <>
      <Appbar.Header style={{ backgroundColor: 'black' }}>
        <Appbar.Content title="Mobile Hub" titleStyle={{ color: 'white' }} />
      </Appbar.Header>
    </>
  );
};

export default Header;
