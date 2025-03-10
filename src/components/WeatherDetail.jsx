import { useLocation } from 'react-router-dom';

function WeatherDetail() {
  const location = useLocation(); // Acceder a la ubicación y el estado pasado
  const { weather } = location.state || {}; // Obtener los datos del clima

  // Si no se pasa el estado, mostramos un mensaje de error
  if (!weather) {
    return <div>No hay información de clima disponible.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold mb-4">Detalles del Clima</h1>

      <div>
        <h2 className="text-2xl font-semibold text-center">{weather.name}</h2>
        <p className="text-center">Temperatura: {weather.main.temp}°C</p>
        <p className="text-center">Humedad: {weather.main.humidity}%</p>
        <p className="text-center">Estado: {weather.weather[0].description}</p>
        <p className="text-center">Viento: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherDetail;
