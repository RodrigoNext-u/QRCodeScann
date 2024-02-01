import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = ({ navigation }) => {
  const [qrData, setQrData] = useState('');

  const handlePressScan = () => {
    navigation.navigate('QRCodeScanner');
  };

  const generateQRCode = () => {
    const dataToEncode = "test";
    setQrData(dataToEncode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur la page d'accueil !</Text>
      <Button title="Scanner QR Code" onPress={handlePressScan} />
      <Button title="Générer QR Code" onPress={generateQRCode} />

      {qrData ? (
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrData} size={200} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
