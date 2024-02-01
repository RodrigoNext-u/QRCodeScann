import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Modal, Button } from 'react-native';
import { Linking } from 'react-native';
import { Camera } from 'expo-camera';

const QRCodeScannerScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      setQrData(data);
      setModalVisible(true);
  
      // Allow scanning again after a short delay
      setTimeout(() => {
        setScanned(false);
      }, 6000); // Adjust the delay as needed
    }
  };

  const handleLinkPress = () => {
    Linking.openURL(qrData);
    setModalVisible(false);
  };
  
  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ref={cameraRef}
        autoFocus={Camera.Constants.AutoFocus.on} // Enable autofocus
      >
        <View style={styles.overlay}>
          <View style={styles.scanBorder} />
        </View>
      </Camera>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.linkText} onPress={handleLinkPress}>
            {qrData}
          </Text>
          <Button title="Fermer" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBorder: {
    width: 200,
    height: 200,
    borderColor: 'white',
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default QRCodeScannerScreen;
