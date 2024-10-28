import React from 'react';
import { SafeAreaView } from 'react-native';
import LoyaltyCards from './src/components/LoyaltyCards'; // Assure-toi que le chemin est correct

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoyaltyCards />
    </SafeAreaView>
  );
};

export default App;

/*import React from 'react';
import Logs from './src/components/Logs'; // Assure-toi que le chemin est correct

const App = () => {
  return <Logs />;
};

export default App;*/


/*import React from 'react';
import Auth from './src/components/Auth'; // Assure-toi que le chemin vers Auth.js est correct

const App = () => {
  return <Auth />;
};

export default App;*/

/*import React from 'react';
import User from './src/components/User'; // Remplace Auth par User

const App = () => {
  return <User />; // Affiche le composant User
};

export default App;*/

