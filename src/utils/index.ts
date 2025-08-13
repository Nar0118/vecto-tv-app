import type { Video } from '@/types';

export const formatDuration = (duration: string): string => {
  const minutes = Math.floor(parseInt(duration) / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${minutes}m`;
};

export const sortVideosByLastClicked = (
  videos: Video[],
  lastClickedId: string | null
): Video[] => {
  if (!lastClickedId) return videos;

  const sortedVideos = [...videos];
  const clickedIndex = sortedVideos.findIndex((video) => video.Id === lastClickedId);

  if (clickedIndex !== -1) {
    const clickedVideo = sortedVideos.splice(clickedIndex, 1)[0];
    sortedVideos.unshift(clickedVideo);
  }

  return sortedVideos;
};

export const saveToSessionStorage = (key: string, value: unknown): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
};

export const getFromSessionStorage = (key: string): unknown => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from session storage:', error);
    return null;
  }
};

export const loadAppData = async (): Promise<{ Featured: Video; TendingNow: Video[] }> => {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading app data:', error);
    throw error;
  }
};
