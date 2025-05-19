import React, { useState } from 'react';
import './calculadora.css';
import { calcularOperacion } from '../utils/calculadora_functions.js';

function Calcular() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [operacion, setOperacion] = useState('');
  const [resultado, setResultado] = useState(null);

  const calculadora = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);
    const resultado = calcularOperacion(num1, num2, operacion);
    setResultado(resultado);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Calculadora</h1>
      <div>
        <input
          type="text"
          placeholder="Número 1"
          value={numero1}
          onChange={(e) => setNumero1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número 2"
          value={numero2}
          onChange={(e) => setNumero2(e.target.value)}
        />
        <select value={operacion} onChange={(e) => setOperacion(e.target.value)}>
          <option value="">Selecciona operación</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <button onClick={calculadora}>Calcular</button>
      </div>
      {resultado !== null && <h2>Resultado: {resultado}</h2>}
    </div>
  );
}

export default Calcular;