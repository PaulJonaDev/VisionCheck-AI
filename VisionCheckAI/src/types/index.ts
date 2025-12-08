export type VisualPattern = 'enrojecimiento' | 'opacidad' | 'reflejo_irregular' | 'inflamacion' | 'fatiga';

export type Severity = 'baja' | 'media' | 'alta';

export interface PatternPrediction {
  pattern: VisualPattern;
  confidence: number;
  severity: Severity;
}

export interface CaptureRecord {
  id: string;
  imageUri: string;
  capturedAt: number;
  quality: {
    brightness?: number;
    blurScore?: number;
    distanceHint?: string;
    eyeBoxes?: EyeBox[];
  };
  predictions: PatternPrediction[];
}

export interface EyeBox {
  x: number; // 0..1 relative
  y: number; // 0..1 relative
  w: number; // 0..1 relative
  h: number; // 0..1 relative
}