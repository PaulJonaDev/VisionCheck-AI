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
