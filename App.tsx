import { View, Text, Button } from 'react-native'
import React from 'react'
import SmsRetriever from 'react-native-sms-retriever';
import codePush from "react-native-code-push";

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const App = () => {
  // Get the phone number (first gif)
  const onPhoneNumberPressed = async () => {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      console.log("phone no", phoneNumber)
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  // Get the SMS message (second gif)
  const onSmsListenerPressed = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          console.log(event);
          SmsRetriever.removeSmsListener();
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
      <Button onPress={onPhoneNumberPressed} title="Open Phone Retriever" />
      <Button onPress={onSmsListenerPressed} title="Open SMS Retriever" />
    </View>
  )
}

export default codePush(codePushOptions)(App);