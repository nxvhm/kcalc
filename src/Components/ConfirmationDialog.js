import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const ConfirmationDialog = (props) => {
  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={props.visible} onDismiss={props.onDismiss}>
            <Dialog.Title>Delete Product</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{props.text}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={props.onDismiss}>Cancel</Button>
              <Button onPress={props.onConfirm}>Remove</Button>

            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default ConfirmationDialog;
