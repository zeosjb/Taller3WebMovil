// Header.js
import React from 'react';
import { Appbar } from 'react-native-paper';

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
