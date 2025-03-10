import { useState } from 'react';
import axios from 'axios';
import './App.css';
import './styles/tailwind.css'; // Asegúrate de que Tailwind esté correctamente configurado
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap para la UI

function App() {
  // Estados para manejar ciudad, clima y errores
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '80518ac4f239850e490d7d84faf43b69'; // Reemplaza con tu propia API Key

  // Función para obtener el clima
  const getWeather = async (city) => {
    try {
      // Eliminar espacios extra en el nombre de la ciudad
      const trimmedCity = city.trim();

      if (!trimmedCity) {
        setError('Por favor ingresa el nombre de una ciudad.');
        return;
      }

      // Llamada a la API de OpenWeather
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`
      );

      setWeather(response.data); // Guardamos los datos del clima
      setError(''); // Limpiamos el mensaje de error si la API responde correctamente
    } catch (err) {
      // Manejamos el error si la llamada a la API falla
      console.error('Error al obtener el clima:', err);
      setWeather(null);
      setError(`No se pudo obtener el clima para esa ciudad. Error: ${err.message}`);
    }
  };

  // Función que se llama al hacer clic en el botón de búsqueda
  const handleSearch = () => {
    getWeather(city);
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-primary mb-4">Clima App</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Introduce una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control w-full p-3 rounded-md"
        />
      </div>

      <button
        onClick={handleSearch}
        className="btn btn-primary w-full py-2 mt-3 rounded-md"
      >
        Buscar
      </button>

      {/* Mostramos el mensaje de error si existe */}
      {error && (
        <p className="error text-red-500 mt-4">{error}</p>
      )}

      {/* Mostramos los datos del clima si existen */}
      {weather && (
        <div className="weather-info mt-4">
          <h2 className="text-2xl font-semibold text-center">{weather.name}</h2>
          <p className="text-center">Temperatura: {weather.main.temp}°C</p>
          <p className="text-center">Humedad: {weather.main.humidity}%</p>
          <p className="text-center">Estado: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
