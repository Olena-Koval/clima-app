import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Asegúrate de que esta clave sea correcta
  const API_KEY = '80518ac4f239850e490d7d84faf43b69';

  // Función para obtener el clima
  const getWeather = async (city) => {
    try {
      // Se asegura de que no haya espacios en blanco al final de la ciudad
      const trimmedCity = city.trim();

      if (!trimmedCity) {
        setError('Por favor ingresa el nombre de una ciudad.');
        return;
      }

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`);

      setWeather(response.data);  // Actualiza el estado con los datos del clima
      setError('');  // Resetea el error
    } catch (err) {
      console.error('Error al obtener el clima:', err);  // Mostrar el error en la consola
      setWeather(null);  // Limpia los datos del clima
      setError(`No se pudo obtener el clima para esa ciudad. Error: ${err.message}`);  // Muestra el error
    }
  };

  const handleSearch = () => {
    getWeather(city);
  };

  return (
    <div className="App">
      <h1>Clima App</h1>

      <input
        type="text"
        placeholder="Introduce una ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Humedad: {weather.main.humidity}%</p>
          <p>Estado: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
