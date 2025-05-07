import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('http://localhost:3000/messages'); // Substitua com a URL do seu json-server
        setMessages(response.data);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    }

    fetchMessages();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conversas</Text>

      <View style={styles.options}>
        <Text style={styles.optionText}>Marcar todas como lidas</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.optionText}>Ordenar</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="#2e473b" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#b7c9b7" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble" size={24} color="#3cb371" />
          <Text style={[styles.navText, { color: '#3cb371' }]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mail-outline" size={24} color="#b7c9b7" />
          <Text style={styles.navText}>Mail</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="user" size={24} color="#b7c9b7" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6f0',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e473b',
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  optionText: {
    color: '#2e473b',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#2e473b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#3cb371',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2e473b',
  },
  message: {
    color: '#5a6d5a',
    fontSize: 14,
  },
  rightSection: {
    alignItems: 'flex-end',
    minWidth: 45,
  },
  time: {
    fontSize: 12,
    color: '#9db79d',
  },
  badge: {
    backgroundColor: '#3cb371',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#cde7d8',
    borderTopWidth: 1,
    shadowColor: '#2e473b',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 6,
  },
  navText: {
    fontSize: 11,
    color: '#b7c9b7',
    marginTop: 4,
    textAlign: 'center',
  },
});
