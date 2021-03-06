import React, { Component, PropTypes } from 'react';
import SignOut from '../auth/SignOut.react';
import gravatar from 'gravatar-api';
import routes from '../routes';
import { CenteredContainer, Text } from '../app/components';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  image: {
    height: 100,
    margin: 20,
    width: 100,
  },
});

class MePage extends Component {

  static propTypes = {
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ navigator, viewer }) {
    if (viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    navigator.replace(routes.home);
  }

  render() {
    const { viewer } = this.props;
    if (!viewer) return null;
    const { displayName, photoURL } = viewer;
    const uri = photoURL || gravatar.imageUrl({
      email: displayName,
      parameters: {
        default: 'retro',
        rating: 'x',
        size: 100,
      },
      secure: true,
    });

    return (
      <CenteredContainer>
        <View>
          <Text>{displayName}</Text>
        </View>
        <Image
          source={{ uri }}
          style={styles.image}
        />
        <SignOut />
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);
