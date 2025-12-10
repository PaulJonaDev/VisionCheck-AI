POST /upload 
  Body: { base64: string } 
  Returns: { image_id } 

POST /analysis 
  Body: { image_id } 
  Returns: { 
    patterns: [...], 
    probabilities: {...}, 
    explanation: "...", 
    timestamp: ... 
  }

POST /ml/predict
  Body: { imageUri?: string, base64?: string, modelPath?: string }
  Returns: { preds: { enrojecimiento, opacidad, reflejo_irregular, inflamacion, fatiga }, image, model }
  Errors: { error: 'ML_SCRIPT_NOT_FOUND' | 'ML_PROCESS_ERROR' | 'ML_TIMEOUT' | 'ML_OUTPUT_PARSE_ERROR', details }
