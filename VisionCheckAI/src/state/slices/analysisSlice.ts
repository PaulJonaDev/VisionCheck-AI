import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CaptureRecord, PatternPrediction } from '../../types';

interface AnalysisState {
  lastCapture?: CaptureRecord;
  history: CaptureRecord[];
}

const initialState: AnalysisState = {
  history: [],
};

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setLastCapture(state, action: PayloadAction<CaptureRecord>) {
      state.lastCapture = action.payload;
    },
    addToHistory(state, action: PayloadAction<CaptureRecord>) {
      state.history.unshift(action.payload);
    },
    clearHistory(state) {
      state.history = [];
    },
    updatePredictions(state, action: PayloadAction<PatternPrediction[]>) {
      if (state.lastCapture) {
        state.lastCapture.predictions = action.payload;
      }
    },
  },
});

export const { setLastCapture, addToHistory, clearHistory, updatePredictions } = analysisSlice.actions;
export default analysisSlice.reducer;