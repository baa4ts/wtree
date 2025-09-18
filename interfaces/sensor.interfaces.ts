export interface SensorResponse {
  fecha: string;
  valor: number;
  sensorID: string;
  sensorUsername: string;
  sensorDescripction: string;
}

export interface SpecificSensor {
  message: string;
  resultado: Resultado;
  token: null;
}

export interface Resultado {
  id: number;
  sensorUsername: string;
  sensorDescripction: string;
  sensorID: string;
  reportes: Reporte[];
}

export interface Reporte {
  id: number;
  sensorID: string;
  valor: number;
  fecha: Date;
}
