"use client";

import { useEffect, useRef } from "react";

interface YouTubeTrack {
  url: string;
  start?: number;
  end?: number;
}

interface HiddenYouTubeAudioHandlerProps {
  currentTrack: number;
  isMuted: boolean;
  isPlaying: boolean;
  volume: number;
  onNextTrack: () => void;
  youtubeRadioLinks: YouTubeTrack[];
}

const HiddenYouTubeAudioHandler = ({
  currentTrack,
  isMuted,
  isPlaying,
  volume,
  onNextTrack,
  youtubeRadioLinks
}: HiddenYouTubeAudioHandlerProps) => {
  const playerRef = useRef<any>(null);
  const current = youtubeRadioLinks[currentTrack];

  // --- Extract YouTube Video ID ---
  const extractVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&#]+)/);
    return match ? match[1] : "";
  };

  // --- Create and manage YouTube player ---
  useEffect(() => {
    let player: any;

    const createPlayer = () => {
      player = new (window as any).YT.Player("yt-hidden-player", {
        videoId: extractVideoId(current.url),
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          start: current.start,
          end: current.end,
        },
        events: {
          onReady: (e: any) => {
            playerRef.current = e.target;
            // Apply mute & volume
            if (isMuted) e.target.mute();
            else e.target.unMute();

            e.target.setVolume(volume * 100);

            if (isPlaying) e.target.playVideo();
            else e.target.pauseVideo();
          },
          onStateChange: (event: any) => {
            // Move to next track automatically when finished
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              onNextTrack();
            }
          },
        },
      });
    };

    // Load YouTube IFrame API if needed
    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    // Cleanup when component unmounts or track changes
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [currentTrack]);

  // --- Handle mute toggle dynamically ---
  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) playerRef.current.mute();
      else playerRef.current.unMute();
    }
  }, [isMuted]);

  // --- Handle pause/play dynamically ---
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) playerRef.current.playVideo();
      else playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // --- Handle volume change dynamically ---
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  // --- Watcher for end time (safety trigger) ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && current.end) {
        const time = playerRef.current.getCurrentTime?.();
        if (time && time >= current.end - 0.5) {
          onNextTrack();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [current.end, onNextTrack]);

  return (
    <div
      id="yt-hidden-player"
      className="absolute w-px h-px opacity-0 pointer-events-none"
    />
  );
};

export default HiddenYouTubeAudioHandler;
