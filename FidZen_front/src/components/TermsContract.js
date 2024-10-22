import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function TermsContract({ navigation }) {
  return (
    <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
      {/* Logo en haut */}
      <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Conteneur pour le contenu */}
        <View style={styles.container}>
          {/* Titre */}
          <Text style={styles.title}>Terms and Conditions of Use for the FidZen Application</Text>

          {/* Texte des conditions */}
          <Text style={styles.subtitle}>1. Publisher of the application</Text>
          <Text style={styles.text}>
            The FidZen application (hereinafter referred to as "FidZen") is published by Nicolas Brault Domingo and Erwan Lebreton, students at Holberton School Laval, whose registered office is located at [Complete Address], registered in the Trade and Companies Register of [City] under the number [SIRET Number].
          </Text>

          <Text style={styles.subtitle}>2. Purpose</Text>
          <Text style={styles.text}>
            These Terms and Conditions of Use (hereinafter referred to as "TCU") are intended to define the terms and conditions of access and use of the FidZen application by its users (hereinafter referred to as "User"). By accessing and using the application, the User unconditionally agrees to these TCU.
          </Text>

          <Text style={styles.subtitle}>3. Services offered</Text>
          <Text style={styles.text}>
            FidZen is an application that provides [describe the main services: for example, loyalty management, personalized reminders, etc.]. The application allows its users to [describe the main features].
          </Text>

          <Text style={styles.subtitle}>4. Access to the application</Text>
          <Text style={styles.text}>
            Access to the FidZen application is free for all users with internet access. All costs related to accessing the services, whether material, software, or internet access, are the responsibility of the User. The publisher will make all reasonable efforts to ensure quality access to the application but is under no obligation to achieve it.
          </Text>

          <Text style={styles.subtitle}>5. Data collection</Text>
          <Text style={styles.text}>
            The use of the FidZen application may require the collection of personal data from Users, in accordance with the applicable legislation. In accordance with the General Data Protection Regulation (GDPR), the User is informed that their personal data may be collected for [explain the purposes: for example, account creation, service improvement, etc.]. The User has the right to access, rectify, delete, and oppose the processing of their personal data by contacting the publisher at [contact email address].
          </Text>

          <Text style={styles.subtitle}>6. User responsibility</Text>
          <Text style={styles.text}>
            The User agrees to use the application in accordance with the laws in force and these TCU. They are prohibited from any use contrary to public order and good morals. Any abusive or unauthorized use of the application will result in the immediate suspension of the User's access.
          </Text>

          <Text style={styles.subtitle}>7. Intellectual property</Text>
          <Text style={styles.text}>
            All content on the FidZen application, including texts, graphics, logos, and other visual elements, are the exclusive property of the publisher or its partners. Any reproduction or exploitation of said content, of any nature whatsoever, is strictly prohibited without the prior written authorization of the publisher.
          </Text>

          <Text style={styles.subtitle}>8. Changes to the TCU</Text>
          <Text style={styles.text}>
            These TCU may be modified at any time by the publisher. The User will be informed of any changes and must accept the new TCU to continue using the application.
          </Text>

          <Text style={styles.subtitle}>9. Governing law and competent jurisdiction</Text>
          <Text style={styles.text}>
            These TCU are governed by French law. In the event of a dispute relating to the interpretation or execution of these terms, the parties will attempt to resolve it amicably. Failing that, the dispute will be brought before the competent courts.
          </Text>

          <Text style={styles.subtitle}>10. Contact</Text>
          <Text style={styles.text}>
            For any questions regarding these TCU or the use of the application, the User can contact the publisher at the following address: [contact email address].
          </Text>
        </View>

        {/* Ajout d'espace pour que le bouton soit en dehors du conteneur blanc */}
        <View style={styles.spacer} />

        {/* Bouton pour retourner à la page RegisterPage en dessous du conteneur */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterPage')}>
          <Text style={styles.buttonText}>Return Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scrollContainer: {
    paddingBottom: 20, // Ajout d'espace pour le défilement vers le bas
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 250, // Ajustement pour éviter que le texte ne chevauche le logo
    paddingVertical: 30,
    marginHorizontal: 20, // Pour que le conteneur ait un peu de marge sur les côtés
  },
  logo: {
    width: 150,  // Taille ajustée du logo
    height: 150,
    position: 'absolute', // Position absolue pour le placer en haut
    top: 50,
  },
  title: {
    fontSize: 28,
    color: '#005f99',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#005f99',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#005f99',
    marginBottom: 20,
    textAlign: 'justify',
  },
  spacer: {
    height: 50, // Ajoute un espace pour que le bouton soit bien séparé du texte
  },
  button: {
    backgroundColor: '#FFFFFF', // Couleur du fond du bouton
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20, // Espacement entre le conteneur et le bouton
    marginHorizontal: 20, // Pour que le bouton soit centré
    width: 150, // Largeur ajustée du bouton
    alignSelf: 'center',
    borderColor: '#00a3cc', // Bordure couleur similaire aux boutons de FirstPage
    borderWidth: 2,
  },
  buttonText: {
    color: '#00a3cc', // Couleur du texte similaire au bouton de la FirstPage
    fontSize: 18,
    fontWeight: 'bold',
  },
});
