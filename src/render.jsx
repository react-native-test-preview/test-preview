import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  Modal,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import TestRenderer from 'react-test-renderer';

const nativeElementMap = {
  RCTView: View,
  View: View,
  RCTText: Text,
  Text: Text,
  RCTTextInput: TextInput,
  RCTSwitch: Switch,
  RCTScrollView: ScrollView,
  RCTModalHostView: Modal,
  Image: Image,
  RCTSafeAreaView: SafeAreaView,
  BaseImage: Image,
  ActivityIndicator: ActivityIndicator,
};

function convertToCreateElement(json) {
  if (!json) return React.createElement(View);

  const elementType = nativeElementMap[json.type] || View;
  const props = json.props || {};

  if (json.children) {
    const children = json.children.map((child) => {
      if (typeof child === "string") {
        return child;
      } else {
        return convertToCreateElement(child);
      }
    });

    return React.createElement(elementType, props, children);
  } else {
    return React.createElement(elementType, props);
  }
}

function renderJSON(json) {
  return convertToCreateElement(json);
}

export function TestPreviewComponent() {
  const [jsonToRender, setJsonToRender] = React.useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:4300/preview')
        .then((response) => response.json())
        .then((data) => {
          setJsonToRender(Object.values(data)[0]);
        });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return renderJSON(jsonToRender);
}

export function registerComponent(Component, defaultProps = {}) {
  const testRendered = TestRenderer.create(<Component {...defaultProps} />);
  const json = testRendered.toJSON();

  if (json && typeof json.type === 'string' && typeof json.props === 'object') {
    nativeElementMap[json.type] = Component;
    return;
  }

  console.warn('Could not register component. Please check that you are passing a valid React component.');
}
