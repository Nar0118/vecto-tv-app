import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppState, Video } from '@/types';

const initialState: AppState = {
  featuredVideo: null,
  trendingVideos: [],
  isMenuOpen: false,
  lastClickedVideoId: null,
  isVideoPlaying: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFeaturedVideo: (state, action: PayloadAction<Video>) => {
      state.featuredVideo = action.payload;
    },
    setTrendingVideos: (state, action: PayloadAction<Video[]>) => {
      state.trendingVideos = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setLastClickedVideoId: (state, action: PayloadAction<string>) => {
      state.lastClickedVideoId = action.payload;
    },
    setVideoPlaying: (state, action: PayloadAction<boolean>) => {
      state.isVideoPlaying = action.payload;
    },
    selectVideo: (state, action: PayloadAction<Video>) => {
      state.featuredVideo = action.payload;
      state.lastClickedVideoId = action.payload.Id;
      state.isVideoPlaying = false;
    },
  },
});

export const {
  setFeaturedVideo,
  setTrendingVideos,
  toggleMenu,
  setMenuOpen,
  setLastClickedVideoId,
  setVideoPlaying,
  selectVideo,
} = appSlice.actions;

export default appSlice.reducer;
