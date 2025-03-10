import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './styles/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import WeatherDetail from './components/WeatherDetail';

function App() {
  const [cities, setCities] = useState(['']);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = '80518ac4f239850e490d7d84faf43b69';

  // Función para obtener el clima
  const getWeather = async (city) => {
    try {
      const trimmedCity = city.trim();
      if (!trimmedCity) return;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`
      );

      setWeatherData((prevData) => [
        ...prevData,
        { city: trimmedCity, weather: response.data },
      ]);
      setError('');
    } catch (err) {
      setError(`No se pudo obtener el clima para la ciudad: ${city}`);
    }
  };

  // Función para manejar el clic en "Buscar clima"
  const handleSearch = () => {
    setWeatherData([]); // Limpiar resultados anteriores
    cities.forEach((city) => handleWeatherSearch(city));
  };

  // Función para manejar la búsqueda del clima de una ciudad
  const handleWeatherSearch = (city) => {
    getWeather(city);
  };

  // Función para manejar el cambio en los campos de las ciudades
  const handleCityChange = (index, value) => {
    const updatedCities = [...cities];
    updatedCities[index] = value;
    setCities(updatedCities);
  };

  // Función para agregar un nuevo campo de ciudad
  const addCityField = () => {
    if (cities.length < 3) {
      setCities([...cities, '']);
    }
  };

  // Función para eliminar el último campo de ciudad
  const removeLastCityField = () => {
    if (cities.length > 1) {
      const updatedCities = cities.slice(0, cities.length - 1);
      setCities(updatedCities);
    }
  };

  return (
    <Router>
      <div className="App container mx-auto p-4">
        {/* Mostrar solo una vez el encabezado "Clima App" */}
        <h1 className="text-center text-3xl font-bold text-primary mb-4">Clima App</h1>

        {/* Formulario para ingresar ciudades */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          {cities.map((city, index) => (
            <div key={index} className="flex flex-col">
              <input
                type="text"
                placeholder="Introduce una ciudad"
                value={city}
                onChange={(e) => handleCityChange(index, e.target.value)}
                className="form-control w-full p-3 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Contenedor para los botones en columna central */}
        <div className="flex flex-col items-center mb-4 space-y-4">
          <button onClick={addCityField} className="btn btn-secondary w-full max-w-xs py-2 rounded-md">
            Agregar ciudad
          </button>
          <button onClick={removeLastCityField} className="btn btn-danger w-full max-w-xs py-2 rounded-md">
            Eliminar último campo
          </button>
          <button onClick={handleSearch} className="btn btn-primary w-full max-w-xs py-2 rounded-md">
            Buscar clima
          </button>
        </div>

        {/* Mostrar mensaje de error */}
        {error && <p className="error text-red-500 mt-4">{error}</p>}

        {/* Mostrar resultados del clima en columnas */}
        <div className="weather-info mt-4 grid grid-cols-3 gap-4">
          {weatherData.length > 0 &&
            weatherData.map((data, index) => (
              <div key={index} className="weather-card p-4 border rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center">{data.weather.name}</h2>
                <div className="text-center mt-2">
                  <p>Temperatura: {data.weather.main.temp}°C</p>
                  <p>Humedad: {data.weather.main.humidity}%</p>
                  <p>Estado: {data.weather.weather[0].description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Definir rutas para inicio y detalles del clima */}
      <Routes>
        <Route path="/weather" element={<WeatherDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
