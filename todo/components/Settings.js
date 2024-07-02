import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const themeStyles = isDarkTheme ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={[styles.profileName, themeStyles.text]}>John Doe</Text>
        <Text style={[styles.profileEmail, themeStyles.text]}>john.doe@example.com</Text>
      </View>

      <View style={styles.settingsSection}>
        <View style={styles.settingItem}>
          <Icon name="notifications-outline" size={24} style={themeStyles.icon} />
          <Text style={[styles.settingText, themeStyles.text]}>Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>

        <View style={styles.settingItem}>
          <Icon name="color-palette-outline" size={24} style={themeStyles.icon} />
          <Text style={[styles.settingText, themeStyles.text]}>Dark Theme</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={setIsDarkTheme}
          />
        </View>

        <View style={styles.settingItem}>
          <Icon name="person-outline" size={24} style={themeStyles.icon} />
          <Text style={[styles.settingText, themeStyles.text]}>Account</Text>
        </View>

        <View style={styles.accountPlaceholder}>
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Username"
            placeholderTextColor={isDarkTheme ? '#ccc' : '#555'}
          />
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Email"
            placeholderTextColor={isDarkTheme ? '#ccc' : '#555'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
  },
  settingsSection: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
  },
  accountPlaceholder: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    width: '100%',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
  icon: {
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
  icon: {
    color: '#fff',
  },
  input: {
    borderColor: '#555',
    backgroundColor: '#333',
    color: '#fff',
  },
});

export default SettingsScreen;
