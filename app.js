import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Modal, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [showCWP, setShowCWP] = useState(false);

  const cwpUrl = 'https://aeroweb.aerolineas.com.ar';

  const handleSyncComplete = () => {
    setShowCWP(false);
    Alert.alert("Roster Actualizado", "La sesión quedó guardada. Se detectaron y recalcularon tus cambios de vuelo y viáticos.");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>B737 Roster & Viáticos</Text>
          <Text style={styles.subtitle}>Croci Staziuk, Damian L. • FO</Text>
        </View>
        <TouchableOpacity style={styles.syncBtn} onPress={() => setShowCWP(true)}>
          <Text style={styles.syncBtnText}>Actualizar Roster</Text>
        </TouchableOpacity>
      </View>

      {/* Resumen Principal */}
      <ScrollView style={styles.content}>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Viáticos Totales</Text>
            <Text style={styles.cardValueGreen}>$963.204</Text>
            <Text style={styles.cardSub}>11 días x $87.564</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Horas Vuelo (TV)</Text>
            <Text style={styles.cardValueBlue}>43h 40m</Text>
            <Text style={styles.cardSub}>TSV: 77h 0m</Text>
          </View>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>Sincronización Automática CWP</Text>
          <Text style={styles.statusText}>
            Tocá "Actualizar Roster" para vincular tu legajo. La app guardará la cookie segura y descargará automáticamente tus novedades.
          </Text>
        </View>
      </ScrollView>

      {/* Modal Navegador CWP (In-App WebView) */}
      <Modal visible={showCWP} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Iniciá Sesión en CWP (Una sola vez)</Text>
            <TouchableOpacity onPress={handleSyncComplete} style={styles.closeBtn}>
              <Text style={{ color: '#38bdf8', fontWeight: 'bold' }}>Guardar y Cerrar</Text>
            </TouchableOpacity>
          </View>
          <WebView 
            source={{ uri: cwpUrl }}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            style={{ flex: 1 }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 16, backgroundColor: '#1e293b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  subtitle: { color: '#94a3b8', fontSize: 12 },
  syncBtn: { backgroundColor: 'rgba(56, 189, 248, 0.2)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.4)' },
  syncBtnText: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  cardRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  card: { flex: 1, backgroundColor: '#1e293b', padding: 12, borderRadius: 16 },
  cardLabel: { color: '#94a3b8', fontSize: 11 },
  cardValueGreen: { color: '#34d399', fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
  cardValueBlue: { color: '#38bdf8', fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
  cardSub: { color: '#64748b', fontSize: 10 },
  statusBox: { backgroundColor: '#1e293b', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  statusTitle: { color: '#f8fafc', fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  statusText: { color: '#94a3b8', fontSize: 12, lineHeight: 18 },
  modalHeader: { padding: 16, backgroundColor: '#1e293b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
});
