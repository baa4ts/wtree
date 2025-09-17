export interface SensorData {
  sensorID: string;
  sensorUsername: string;
  sensorDescription: string;
}

export interface SensorResponse {
  message: string;
  token: string;
  resultado: Resultado;
}

export interface Resultado {
  id: number;
  sensorID: string;
  sensorUsername: string;
  sensorDescripction: string;
  reportes: Reporte[];
}

export interface Reporte {
  id: number;
  sensorID: string;
  valor: number;
  fecha: string;
}
