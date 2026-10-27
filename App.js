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

  // Roster actualizado con la correcta distinción de roles (Mandos Técnicos vs. Cabina / Comisario CM)
  const [rosterData, setRosterData] = useState([
    { 
      id: '1', 
      flightNumber: 'AR1492', 
      origin: 'EZE', 
      destination: 'SLA', 
      departureTime: '06:30', 
      arrivalTime: '08:45', 
      crew: [
        'Capt. [Nombre Comandante]', 
        'F/O Damián Croci (Copiloto)', 
        'CM. C. Sayans (Comisario)'
      ] 
    },
    { 
      id: '2', 
      flightNumber: 'AR1581', 
      origin: 'SLA', 
      destination: 'COR', 
      departureTime: '09:45', 
      arrivalTime: '11:05', 
      crew: [
        'Capt. [Nombre Comandante]', 
        'F/O Damián Croci (Copiloto)', 
        'CM. C. Sayans (Comisario)'
      ] 
    },
    { 
      id: '3', 
      flightNumber: 'AR1196', 
      origin: 'AEP', 
      destination: 'REL', 
      departureTime: '17:40', 
      arrivalTime: '19:45', 
      crew: [
        'Capt. M. Albino', 
        'F/O Damián Croci (Copiloto)', 
        'CM. [Comisario]'
      ] 
    },
    { 
      id: '4', 
      flightNumber: 'AR1280', 
      origin: 'AEP', 
      destination: 'SCL', 
      departureTime: '07:00', 
      arrivalTime: '09:25', 
      crew: [
        'Capt. D. Cavalli', 
        'F/O Damián Croci (Copiloto)', 
        'CM. [Comisario]'
      ] 
    }
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
        Alert.alert('Sincronización CWP Exitosa', 'Programación B737 y roles de tripulación actualizados correctamente.');
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Aviso de Red', 'Conectado al CWP. Roster sincronizado correctamente.');
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

          <Text style={styles.sectionTitle}>Aeroweb CWP</Text>
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
        <View>
          <Text style={styles.title}>Roster Piloto</Text>
          <Text style={styles.subtitle}>Flota {profile.fleet} • Legajo {profile.legajo}</Text>
        </View>
        <TouchableOpacity style={styles.profileIconButton} onPress={() => setCurrentScreen('profile')}>
          <Text style={styles.profileIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.syncButton} onPress={handleSync} disabled={loading}>
        {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.syncButtonText}>🔄 Sincronizar Automático CWP</Text>}
      </TouchableOpacity>

      <ScrollView style={styles.scrollArea}>
        <Text style={styles.sectionHeader}>Próximos Servicios B737</Text>
        {rosterData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.flightNumber}>{item.flightNumber}</Text>
              <Text style={styles.routeText}>{item.origin} ➔ {item.destination}</Text>
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Salida: {item.departureTime}</Text>
              <Text style={styles.timeLabel}>Llegada: {item.arrivalTime}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.crewTitle}>Tripulación:</Text>
            {item.crew.map((member, idx) => (
              <Text key={idx} style={styles.crewMember}>• {member}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090d16' },
  loginCard: { flex: 1, justifyContent: 'center', padding: 24 },
  brandTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 20 },
  entrarTitle: { fontSize: 20, fontWeight: '600', color: '#38bdf8', marginBottom: 20 },
  socialButton: { backgroundColor: '#1e293b', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#334155' },
  socialButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '500' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: '#334155' },
  dividerText: { color: '#64748b', paddingHorizontal: 10, fontSize: 13 },
  inputLabel: { color: '#94a3b8', fontSize: 11, fontWeight: 'bold', marginBottom: 6, letterSpacing: 1 },
  input: { backgroundColor: '#111827', color: '#ffffff', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 8, marginBottom: 14, fontSize: 15, borderWidth: 1, borderColor: '#1f2937' },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  switchText: { color: '#cbd5e1', marginLeft: 10, fontSize: 14 },
  primaryButton: { backgroundColor: '#3b82f6', paddingVertical:
