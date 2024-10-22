// src/components/Logs.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { getLogsByUserId } from '../api/logs.api'; // Correction de l'import

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        console.log('Tentative de récupération des logs pour l’utilisateur'); // Log pour vérification
        const data = await getLogsByUserId('eb1899fa-3f2f-49f9-bbad-8704f5e15170');
        console.log('Données récupérées depuis l’API:', data); // Log supplémentaire pour voir les données récupérées
        setLogs(data);
        setMessage('Logs récupérés avec succès');
      } catch (error) {
        console.error('Erreur lors de la récupération des logs:', error);
        setMessage('Erreur lors de la récupération des logs');
      }
    };
    fetchLogs();
  }, []);

  console.log('Logs à afficher:', logs); // Log supplémentaire pour vérifier les données à afficher

  return (
    <ScrollView>
      {message ? <Text>{message}</Text> : null}
      {logs.length > 0 ? (
        logs.map((log) => (
          <View key={log.id}>
            <Text>Action: {log.action}</Text>
            <Text>Date: {new Date(log.createdAt).toLocaleString()}</Text>
          </View>
        ))
      ) : (
        <Text>Aucun log à afficher</Text> // Message de fallback
      )}
    </ScrollView>
  );
};

export default Logs;
