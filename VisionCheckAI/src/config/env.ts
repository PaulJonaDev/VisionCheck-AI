export const cfg = {
  eyeGuideEnabled: (process.env.EXPO_PUBLIC_FEATURE_EYE_GUIDE || 'true') === 'true',
  backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:4000',
};
