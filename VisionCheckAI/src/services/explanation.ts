import { PatternPrediction } from '../types';

const HYPOTHESES: Record<string, string[]> = {
  enrojecimiento: ['irritación leve', 'conjuntivitis no específica', 'sequedad ocular'],
  opacidad: ['catarata incipiente', 'queratitis superficial', 'sequedad corneal'],
  reflejo_irregular: ['cicatriz corneal', 'sequedad de superficie ocular', 'irregularidad en película lagrimal'],
  inflamacion: ['blefaritis', 'irritación palpebral', 'inflamación leve no específica'],
  fatiga: ['fatiga visual', 'estrés digital', 'ojo seco leve'],
};

const EXAMS: Record<string, string[]> = {
  enrojecimiento: ['Evaluación conjuntival', 'Tinción con fluoresceína', 'Prueba de lágrima (Schirmer/TBUT)'],
  opacidad: ['Evaluación con lámpara de hendidura', 'Examen de cristalino', 'Reflexión rojo (test)'],
  reflejo_irregular: ['Topografía/aberrometría corneal', 'Lámpara de hendidura de córnea'],
  inflamacion: ['Evaluación de párpados y borde palpebral', 'Meibografía (función de glándulas de Meibomio)'],
  fatiga: ['Evaluación de visión cercana', 'Tiempo de ruptura lagrimal (TBUT)'],
};

export function explain(predictions: PatternPrediction[]) {
  const lines = predictions.map(p => {
    const pct = Math.round(p.confidence * 100);
    const name =
      p.pattern === 'enrojecimiento'
        ? 'Enrojecimiento'
        : p.pattern === 'opacidad'
        ? 'Opacidad'
        : p.pattern === 'reflejo_irregular'
        ? 'Reflejo irregular'
        : p.pattern === 'inflamacion'
        ? 'Posible inflamación'
        : 'Fatiga ocular';
    return `${name}: ${pct}% (severidad ${p.severity})`;
  });
  const disclaimer = 'Este resultado no es un diagnóstico ni reemplaza una consulta profesional.';
  const hypotheses: string[] = [];
  predictions.forEach(p => {
    if (p.confidence >= 0.3) {
      const hs = HYPOTHESES[p.pattern];
      if (hs) {
        hs.slice(0, 2).forEach(h => {
          if (!hypotheses.includes(h)) hypotheses.push(h);
        });
      }
    }
  });
  const exams: string[] = [];
  predictions.forEach(p => {
    if (p.confidence >= 0.3) {
      const es = EXAMS[p.pattern];
      if (es) {
        es.forEach(e => {
          if (!exams.includes(e)) exams.push(e);
        });
      }
    }
  });
  const recommendation = {
    callToAction: 'Se recomienda una evaluación con un profesional de la visión (optómetra u oftalmólogo).',
    exams,
  };
  let lensScore = 0;
  predictions.forEach(p => {
    if (p.pattern === 'reflejo_irregular') lensScore += p.confidence * 0.4;
    if (p.pattern === 'fatiga') lensScore += p.confidence * 0.3;
    if (p.pattern === 'opacidad') lensScore += p.confidence * 0.15;
    if (p.pattern === 'enrojecimiento' || p.pattern === 'inflamacion') lensScore += p.confidence * 0.1;
  });
  lensScore = Math.max(0, Math.min(1, lensScore));
  const lensProbability = Math.round(lensScore * 100);

  const avoid: string[] = [];
  const addAvoid = (items: string[]) => items.forEach(i => { if (!avoid.includes(i)) avoid.push(i); });
  predictions.forEach(p => {
    if (p.confidence >= 0.3) {
      if (p.pattern === 'fatiga') addAvoid(['Uso prolongado de pantallas sin descansos', 'Iluminación deficiente al leer', 'Falta de parpadeo consciente']);
      if (p.pattern === 'enrojecimiento' || p.pattern === 'inflamacion') addAvoid(['Frotar los ojos', 'Exposición a humo y polvo', 'Uso inadecuado de lentes de contacto']);
      if (p.pattern === 'reflejo_irregular' || p.pattern === 'opacidad') addAvoid(['Exposición intensa al sol sin protección UV', 'Ambientes muy secos sin lubricación']);
    }
  });

  const MEANINGS: Record<string, Record<string, string>> = {
    enrojecimiento: {
      baja: 'Se observan signos compatibles con enrojecimiento leve. Suele asociarse a irritación o sequedad.',
      media: 'Hay indicios moderados de enrojecimiento. Podría relacionarse con irritación sostenida o alergias leves.',
      alta: 'Se aprecian signos marcados de enrojecimiento. Valora descanso ocular y lubricación; consulta si persiste.',
    },
    opacidad: {
      baja: 'Se observan ligeras áreas menos transparentes. Podrían ser variaciones normales o sequedad superficial.',
      media: 'Hay indicios moderados de menor transparencia. Sugiere revisión con lámpara de hendidura.',
      alta: 'Se detectan áreas notablemente menos transparentes. Recomendable evaluación profesional.',
    },
    reflejo_irregular: {
      baja: 'La reflexión de luz muestra leves irregularidades, frecuente en sequedad.',
      media: 'Irregularidad moderada en la superficie. Podría indicar alteración de la película lagrimal.',
      alta: 'Irregularidad marcada. Valora lubricación y revisión de superficie corneal.',
    },
    inflamacion: {
      baja: 'Signos leves compatibles con inflamación en zona palpebral.',
      media: 'Indicios moderados de inflamación. Considera higiene palpebral.',
      alta: 'Signos más notables de inflamación. Recomendable valoración clínica si persiste.',
    },
    fatiga: {
      baja: 'Se aprecian signos leves de cansancio ocular. Descansos breves pueden ayudar.',
      media: 'Fatiga moderada. Implementa regla 20-20-20 y mejora iluminación.',
      alta: 'Fatiga marcada. Reduce exposición a pantallas y considera lubricación.',
    },
  };
  const details = predictions.map(p => MEANINGS[p.pattern][p.severity]);

  return { lines, disclaimer, hypotheses, recommendation, lensProbability, avoid, details };
}