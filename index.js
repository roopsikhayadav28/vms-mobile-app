
// import 'dotenv/config';
import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';
import App from './App';

// Call dotenv.config() at the entry point of your application
// dotenv.config();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
