import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fetchPlaceSuggestions } from '../../../infrastructure/api/places';

const transportModes = [
  { key: 'car', label: 'Carro' },
  { key: 'bus', label: 'Bus' },
  { key: 'walk', label: 'A pie' },
  { key: 'bike', label: 'Bici' },
];

export const DirectionPanel = ({
   origin,
  destination,
  mode,
  setOrigin,
  setDestination,
  GOOGLE_MAPS_API_KEY,
  setMode,
  onClose,
  onSwap,
  onSubmit,

  
}: {
   origin: string;
  destination: string;
  mode: string;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setMode: (value: string) => void;
  onClose: () => void;
  onSwap: () => void;
  onSubmit: (origin: string, destination: string, mode: string) => void;
  GOOGLE_MAPS_API_KEY: string;

}) => {
  //const [origin, setOrigin] = useState('');
  //const [destination, setDestination] = useState('');
  //const [mode, setMode] = useState('car');
const [originSuggestions, setOriginSuggestions] = useState<{ description: string; place_id: string }[]>([]);
const [destinationSuggestions, setDestinationSuggestions] = useState<{ description: string; place_id: string }[]>([]);

const handleOriginChange = async (text: string) => {
  setOrigin(text);
  const suggestions = await fetchPlaceSuggestions(text, GOOGLE_MAPS_API_KEY);
  setOriginSuggestions(suggestions);
};

const handleOriginSelect = (description: string) => {
  setOrigin(description);
  setOriginSuggestions([]); // <-- Limpia las sugerencias
};

const handleDestinationChange = async (text: string) => {
  setDestination(text);
  const suggestions = await fetchPlaceSuggestions(text, GOOGLE_MAPS_API_KEY);
  setDestinationSuggestions(suggestions);
};

const handleDestinationSelect = (description: string) => {
  setDestination(description);
  setDestinationSuggestions([]); // <-- Limpia las sugerencias
};



  return (






    <View style={styles.panel}>
<TextInput
  style={styles.input}
  placeholder="Origen"
  value={origin}
  onChangeText={handleOriginChange}
/>
{originSuggestions.map(s => (
  <TouchableOpacity key={s.place_id} onPress={() => handleOriginSelect(s.description)}>
    <Text style={styles.suggestion}>{s.description}</Text>
  </TouchableOpacity>
))}

  <TextInput
     style={styles.input}
  placeholder="Destino"
  value={destination}
  onChangeText={handleDestinationChange}
  />
  {destinationSuggestions.map(s => (
     <TouchableOpacity key={s.place_id} onPress={() => handleDestinationSelect(s.description)}>
    <Text style={styles.suggestion}>{s.description}</Text>
  </TouchableOpacity>
  ))}



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


suggestion: {
  padding: 8,
  backgroundColor: '#f0f0f0',
  borderBottomWidth: 1,
  borderColor: '#ddd',
},

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