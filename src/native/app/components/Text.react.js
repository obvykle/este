import React, { Component, PropTypes } from 'react';
import theme from '../theme';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: theme.textColor,
    lineHeight: theme.lineHeight * theme.fontSize,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
  },
});

// Normalize multiline strings because Text component preserves spaces.
const normalizeMultilineString = message => message.replace(/ +/g, ' ').trim();

export default class AppText extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style,
  };

  constructor() {
    super();
    this.onTextRef = this.onTextRef.bind(this);
  }

  onTextRef(text) {
    this.text = text;
  }

  setNativeProps(nativeProps) {
    this.text.setNativeProps(nativeProps);
  }

  render() {
    const { children, style } = this.props;
    return (
      <Text {...this.props} ref={this.onTextRef} style={[styles.text, style]}>
        {typeof children === 'string'
          ? normalizeMultilineString(children)
          : children
        }
      </Text>
    );
  }

}
