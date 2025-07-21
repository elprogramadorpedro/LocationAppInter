import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const transportModes = [
  { key: 'car', label: 'Carro' },
  { key: 'bus', label: 'Bus' },
  { key: 'walk', label: 'A pie' },
  { key: 'bike', label: 'Bici' },
];

export const DirectionPanel = ({
  onClose,
  onSwap,
  onSubmit,
}: {
  onClose: () => void;
  onSwap: () => void;
  onSubmit: (origin: string, destination: string, mode: string) => void;
}) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('car');

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>Direcciones</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Origen"
          value={origin}
          onChangeText={setOrigin}
        />
        <TouchableOpacity onPress={onSwap} style={styles.swapBtn}>
          <Text style={styles.swapText}>⇅</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Destino"
          value={destination}
          onChangeText={setDestination}
        />
      </View>
      <View style={styles.modes}>
        {transportModes.map(m => (
          <TouchableOpacity
            key={m.key}
            style={[
              styles.modeBtn,
              mode === m.key && styles.modeBtnActive,
            ]}
            onPress={() => setMode(m.key)}
          >
            <Text style={mode === m.key ? styles.modeTextActive : styles.modeText}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => onSubmit(origin, destination, mode)}
      >
        <Text style={styles.submitText}>Buscar ruta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  close: { fontSize: 22, color: '#333' },
  inputs: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: '#f9f9f9',
  },
  swapBtn: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  swapText: { fontSize: 18 },
  modes: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  modeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginHorizontal: 2,
  },
  modeBtnActive: { backgroundColor: '#007AFF' },
  modeText: { color: '#333' },
  modeTextActive: { color: '#fff', fontWeight: 'bold' },
  submitBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});