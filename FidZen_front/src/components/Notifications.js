// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import { getNotifications, markNotificationAsRead } from '../api/notifications.api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      const updatedNotifications = notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, status: 'read' } : notif
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification', error);
    }
  };

  return (
    <ScrollView>
      {notifications.map((notif) => (
        <View key={notif.id}>
          <Text>{notif.message}</Text>
          <Text>Status: {notif.status}</Text>
          <Button title="Marquer comme lue" onPress={() => handleMarkAsRead(notif.id)} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Notifications;
