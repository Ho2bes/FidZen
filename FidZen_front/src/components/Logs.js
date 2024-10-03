// src/components/Logs.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { getLogs } from '../api/logs.api';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getLogs('123'); // remplacer '123' par l'ID de l'utilisateur
        setLogs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des logs', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <ScrollView>
      {logs.map((log) => (
        <View key={log._id}>
          <Text>Action: {log.action}</Text>
          <Text>Date: {new Date(log.createdAt).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Logs;
