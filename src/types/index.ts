export interface Video {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}

export interface AppData {
  Featured: Video;
  TendingNow: Video[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface AppState {
  featuredVideo: Video | null;
  trendingVideos: Video[];
  isMenuOpen: boolean;
  lastClickedVideoId: string | null;
  isVideoPlaying: boolean;
}
