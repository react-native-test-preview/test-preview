# React native test preview

<p align="center">
  Utility that allows visualization of component tests for react native applications.
</p>

<p align="center">
  <img align="center" src="./preview.gif" alt="Test preview demo" />
</p>

## Features

- Preview your app state while writing tests
- Auto reload the screen when your test executes
- Supports all style libraries out the box
- Supports external libraries with `registerComponent` callback

## How to use

`npm i @react-native-test-preview/test-preview -D` or `yarn add @react-native-test-preview/test-preview -D`

In your App.tsx file:
```diff
+import { TestPreviewComponent } from '@react-native-test-preview/test-preview';

function App() {
  //...
-  return ...;
+  return <TestPreviewComponent />;
}
```

> :information_source: You can use package such as `react-native-dotenv` to enable/disable the PreviewComponent on start

To run the preview server:
```
  //inside package.json
  "scripts": {
    "preview-server": "test-preview"
  }
```
then in the terminal: `npm run preview-server`

And in your test files:

```diff
+import { savePreview } from '@react-native-test-preview/test-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
+   savePreview('App:should work as expected', screen.toJSON());
  });
});
```

## Examples

Soon...

## Caveats

If you test components that have external libraries with custom native components, like ReactNativeMaps or Reanimated, you have to register them with `registerComponent` fn.

Example:
```jsx
import { registerComponent } from '@react-native-test-preview/test-preview';
import MyLibraryComponent from 'external-library';

registerComponent(MyLibraryComponent)
```
or
```jsx
import { registerComponent } from '@react-native-test-preview/test-preview';
import MyLibraryComponent from 'external-library';

registerComponent(MyLibraryComponent, { prop1: value, prop2: value2 })
```
