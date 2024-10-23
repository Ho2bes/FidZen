//import { registerRootComponent } from 'expo';
//import App from './App';

// Enregistre le composant racine de l'application avec Expo
//registerRootComponent(App);


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
