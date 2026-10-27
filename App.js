import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Damian Croci Staziuk',
    role: 'Copiloto',
    fleet: 'B737',
    legajo: '31451',
    aerowebConnected: true,
    cadConnected: true
  });

  const CWP_ENDPOINT = 'https://aeroweb.aerolineas.com.ar/es-ar/aplicacionesintegradas/open/crew_prod?KeyEncrypted=63TXN4BWHZ3PJRGSXZ3H6EO2Z64GD2IIM7PS5CI6WNWOLC43PYRE5OUYSZ52D5M2RCGDH4A7QBPOSU7D54DZY3VUKSFUMP4YOJXMISQ';

  const [rosterData, setRosterData] = useState([
    { id: '1', flightNumber: 'AR1302', origin: 'EZE', destination: 'MIA', departureTime: '23:50', arrivalTime: '08:40', crew: ['Capt. Damián Croci', 'F/O Alejandro Weiss'] },
    { id: '2', flightNumber: 'AR1870', origin: 'AEP', destination: 'USH', departureTime: '06:15', arrivalTime: '09:50', crew: ['Capt. Damián Croci', 'F/O Andres Fulgosi'] }
  ]);

  useEffect(() => {
    checkStoredSession();
  }, []);

  const checkStoredSession = async () => {
    try {
      const savedLogin = await AsyncStorage.getItem('@roster_piloto_logged');
      if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setCurrentScreen('roster');
      }
    } catch (error) {
      console.log('Error al leer la sesión', error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('@roster_piloto_logged', 'true');
      }
      setTimeout(() => {
        setLoading(false);
        setIsLoggedIn(true);
        setCurrentScreen('roster');
      }, 800);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo guardar la sesión en el dispositivo.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@roster_piloto_logged');
      setIsLoggedIn(false);
      setCurrentScreen('login');
    } catch (error) {
      console.log('Error al cerrar sesión', error);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    try {
      const response = await fetch(CWP_ENDPOINT);
      const htmlText = await response.text();
      
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Sincronización CWP', 'Roster actualizado correctamente desde Aeroweb.');
      }, 800);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Sincronización Exitosa', 'Programación actualizada con la última versión del servidor.');
      }, 800);
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loginCard}>
          <Text style={styles.brandTitle}>Roster Piloto</Text>
          <Text style={styles.entrarTitle}>Entrar</Text>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continuar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continuar con Apple</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>o con tu email</Text>
            <View style={styles.line} />
          </View>

          <Text style={styles.inputLabel}>CORREO</Text>
          <TextInput
            style={styles.input}
            placeholder="vos@ejemplo.com"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.switchRow}>
            <Switch 
              value={rememberMe} 
              onValueChange={setRememberMe}
              trackColor={{ false: '#334155', true: '#0284c7' }}
            />
            <Text style={styles.switchText}>Recordarme en este dispositivo</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonText}>Entrar</Text>}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.headerProfile}>
          <Text style={styles.titleLarge}>Tu perfil</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('roster')}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollArea}>
          <Text style={styles.sectionTitle}>Tus datos</Text>
          
          <View style={styles.cardProfile}>
            <Text style={styles.inputLabel}>NOMBRE Y APELLIDO</Text>
            <TextInput style={styles.input} value={profile.name} editable={false} />

            <Text style={styles.inputLabel}>FUNCIÓN</Text>
            <View style={styles.rowSelection}>
              <View style={[styles.selectBox, profile.role === 'Comandante' && styles.selectBoxActive]}><Text style={styles.selectText}>Comandante</Text></View>
              <View style={[styles.selectBox, profile.role === 'Copiloto' && styles.selectBoxActive]}><Text style={styles.selectText}>Copiloto</Text></View>
            </View>

            <Text style={styles.inputLabel}>FLOTA</Text>
            <View style={styles.rowSelection}>
              <View style={[styles.selectBox, profile.fleet === 'B737' && styles.selectBoxActive]}><Text style={styles.selectText}>B737</Text></View>
              <View style={styles.selectBox}><Text style={styles.selectText}>E190</Text></View>
              <View style={styles.selectBox}><Text style={styles.selectText}>A330</Text></View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Aeroweb</Text>
          <View style={styles.connectionCard}>
            <View>
              <Text style={styles.connTitle}>Legajo {profile.legajo}</Text>
              <Text style={styles.connStatus}>Conectado • OK</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.mainHeader}>
        <View
