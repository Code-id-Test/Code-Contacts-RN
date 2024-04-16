import React from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  ModalProps as RNModalProps,
  Dimensions,
} from 'react-native';
import Text from './Text';
import Button from './Button';
import Icon from 'react-native-vector-icons/Feather';
import Spacer from './Spacer';

interface ModalProps extends RNModalProps {
  onClose: () => void;
  onAccept: () => void;
}

export default (props: ModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topContainer}>
              <Text style={styles.modalTitle}>Title</Text>
              <Button style={styles.buttonClose} onPress={props.onClose}>
                <Icon name="x" style={styles.closeIcon} />
              </Button>
            </View>
            <Spacer height={8} />
            <Text style={styles.modalText}>Hello World!</Text>
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalActionCancel}
                onPress={props.onClose}>
                <Text>CANCEL</Text>
              </Pressable>
              <Pressable style={styles.modalActionOK} onPress={props.onAccept}>
                <Text style={styles.modalActionOKText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalView: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  topContainer: {
    paddingTop: 12,
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  closeIcon: {
    color: '#000',
    fontSize: 22,
    alignItems: 'center',
  },
  cancelIcon: {
    color: '#000',
    fontSize: 20,
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  modalTitle: {
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 14,
    verticalAlign: 'middle',
    color: '#000',
    fontWeight: '600',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  modalActions: {
    flexDirection: 'row',
    height: 40,
    bottom: 0,
  },
  modalActionCancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionOK: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionOKText: {
    color: '#FFC0CB',
    fontWeight: '600',
  },
});
