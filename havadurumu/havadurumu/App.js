// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [icon, setIcon] = useState('');

  const getWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f7b728324d5a45f6fd4dbbcaa48f7335&units=metric&lang=tr`
      );
      const data = await response.json();
      setWeather(data.weather[0].description);
      setTemperature(data.main.temp);
      setIcon(data.weather[0].icon);
    
  };

  useEffect(() => {
    // Başlangıçta hava durumu verisi al (istediğiniz gibi özelleştirebilirsiniz)
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hava Durumu Uygulaması</Text>
      <TextInput
        style={styles.input}
        placeholder="Şehir adı girin"
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Hava Durumu Getir" onPress={getWeather} />
      {weather ? <Text style={styles.weather}>Hava Durumu: {weather}</Text> : null}
      {temperature ? <Text style={styles.temperature}>Sıcaklık: {temperature}°C</Text> : null}
      {icon ? (
        <Image
          style={styles.icon}
          source={{
            uri: `https://openweathermap.org/img/w/${icon}.png`,
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  weather: {
    fontSize: 18,
    marginTop: 20,
  },
  temperature: {
    fontSize: 18,
    marginTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
});

export default App;
