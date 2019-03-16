# BlackBox
This is an experiment with using protobuf to define a JS/native code interface such that one can write business logic for a native app in JavaScript. It's either a really bad idea or a really good idea.

## Getting started
```bash
brew install protoc carthage
cd js && npm install
cd ../ios && carthage update
open BlackBox.xcodeproj
# build & run the iOS app
```

## How this works
The `js` folder contains a simple JS redux app (in index.js). Notably, the structure of that app's state, as well as all of the actions that can be dispacthed into the store, is predefined in `blackbox.proto`.


Running webpack on that app (`npm run-script build`) produces `dist/main.js`, which is bundled into the iOS app (whose source is in the `ios` directory).

The iOS app loads this JS module inside a `JSContext` - somewhat like a node environment. Any functions that are exported in `index.js` can be referenced inside `JavaScript.swift` via the `getHooksFunc` function.

State is handed back and forth between the `JSContext` and the iOS app as serialized proto. `BBArrayConverter` handles this conversion.

By calling `JavaScript.addStateCallback`, one can effectively subscribe to changes to the redux store, but in swift.

By calling `JavaScript.handleAction`, one can dispatch actions into the redux store (again, in swift).

## Making changes
- If you make changes to the proto, re-run `proto.sh`. If you make changes to the JS, re-run `npm run-script build`. (Both of these commands are run automatically via Run Script Build Phase when you run the iOS app.)