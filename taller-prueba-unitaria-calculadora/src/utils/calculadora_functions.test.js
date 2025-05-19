
import { calcularOperacion } from '../utils/calculadora_functions.js';

describe('Calcular Suma, resta, multiplcacion y división', () => {
    test('suma números positivos', () => {
        expect(calcularOperacion(1, 2, '+')).toBe(3);
    });
    test('resta', () => {
        expect(calcularOperacion(5, 2, '-')).toBe(3);
    });
    test('multiplicación', () => {
        expect(calcularOperacion(2, 3, '*')).toBe(6);
    });
    test('división', () => {
        expect(calcularOperacion(6, 2, '/')).toBe(3);
    });
    test('división entre cero', () => {
        expect(calcularOperacion(6, 0, '/')).toBe("No se puede dividir entre cero");
    }
    );
});

afterEach(() => {
    jest.clearAllTimers(); // Limpia cualquier timer que pueda estar abierto
});