import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import styles from './styles';

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');

  return (
    <WebView
      style={styles.web}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape().isRequired,
};
