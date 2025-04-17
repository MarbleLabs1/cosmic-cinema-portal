
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type PlayerType = 'builtin' | 'vlc' | 'jellyfin' | 'system';

interface PlayerSettings {
  defaultPlayer: PlayerType;
  autoPlay: boolean;
  rememberPlaybackPosition: boolean;
  subtitlesEnabled: boolean;
  setDefaultPlayer: (player: PlayerType) => void;
  setAutoPlay: (autoPlay: boolean) => void;
  setRememberPlaybackPosition: (remember: boolean) => void;
  setSubtitlesEnabled: (enabled: boolean) => void;
}

const PlayerSettingsContext = createContext<PlayerSettings | undefined>(undefined);

export function PlayerSettingsProvider({ children }: { children: ReactNode }) {
  const [defaultPlayer, setDefaultPlayer] = useState<PlayerType>('builtin');
  const [autoPlay, setAutoPlay] = useState(true);
  const [rememberPlaybackPosition, setRememberPlaybackPosition] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  
  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('playerSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setDefaultPlayer(settings.defaultPlayer || 'builtin');
      setAutoPlay(settings.autoPlay !== undefined ? settings.autoPlay : true);
      setRememberPlaybackPosition(settings.rememberPlaybackPosition !== undefined ? settings.rememberPlaybackPosition : true);
      setSubtitlesEnabled(settings.subtitlesEnabled !== undefined ? settings.subtitlesEnabled : true);
    }
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = {
      defaultPlayer,
      autoPlay,
      rememberPlaybackPosition,
      subtitlesEnabled
    };
    localStorage.setItem('playerSettings', JSON.stringify(settings));
  }, [defaultPlayer, autoPlay, rememberPlaybackPosition, subtitlesEnabled]);
  
  return (
    <PlayerSettingsContext.Provider
      value={{
        defaultPlayer,
        autoPlay,
        rememberPlaybackPosition,
        subtitlesEnabled,
        setDefaultPlayer,
        setAutoPlay,
        setRememberPlaybackPosition,
        setSubtitlesEnabled
      }}
    >
      {children}
    </PlayerSettingsContext.Provider>
  );
}

export function usePlayerSettings() {
  const context = useContext(PlayerSettingsContext);
  if (context === undefined) {
    throw new Error('usePlayerSettings must be used within a PlayerSettingsProvider');
  }
  return context;
}
