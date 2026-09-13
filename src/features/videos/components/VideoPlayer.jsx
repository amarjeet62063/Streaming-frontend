import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture,
  Play,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function VideoPlayer({ video }) {
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlay = async () => {
    const player = videoRef.current;

    if (!player) return;

    if (player.paused) {
      await player.play();
    } else {
      player.pause();
    }
  };

  const seek = (seconds) => {
    const player = videoRef.current;

    if (!player) return;

    player.currentTime = Math.min(
      Math.max(player.currentTime + seconds, 0),
      player.duration || 0,
    );
  };

  const handleTimeUpdate = () => {
    const player = videoRef.current;

    if (!player) return;

    setCurrentTime(player.currentTime);
  };

  const handleLoadedMetadata = () => {
    const player = videoRef.current;

    if (!player) return;

    setDuration(player.duration);
  };

  const handleSeek = (event) => {
    const player = videoRef.current;

    if (!player) return;

    const time = Number(event.target.value);

    player.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (event) => {
    const value = Number(event.target.value);

    const player = videoRef.current;

    if (!player) return;

    player.volume = value;
    player.muted = value === 0;

    setVolume(value);
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    const player = videoRef.current;

    if (!player) return;

    if (player.muted || player.volume === 0) {
      player.muted = false;

      if (player.volume === 0) {
        player.volume = 1;
        setVolume(1);
      }

      setIsMuted(false);
    } else {
      player.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const playerContainer = playerRef.current;

    if (!playerContainer) return;
// console.log(playerContainer.fullscreenElement());

    if (!document.fullscreenElement) {
      await playerContainer.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handlePictureInPicture = async () => {
    const player = videoRef.current;

    if (!player || !document.pictureInPictureEnabled) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await player.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-picture failed:", error);
    }
  };

  const changePlaybackRate = (rate) => {
    const player = videoRef.current;

    if (!player) return;

    player.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyboard = (event) => {
      const player = videoRef.current;

      if (!player) return;

      if (event.target instanceof HTMLInputElement) return;

      switch (event.key.toLowerCase()) {
        case " ":
        case "k":
          event.preventDefault();
          togglePlay();
          break;

        case "m":
          toggleMute();
          break;

        case "f":
          toggleFullscreen();
          break;

        case "arrowleft":
          seek(-5);
          break;

        case "arrowright":
          seek(5);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  return (
    <div
      ref={playerRef}
      className="group relative overflow-hidden rounded-xl bg-black shadow-lg "
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video?.videoFile?.url}
        poster={video?.thumbnail?.url}
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="block aspect-video w-full cursor-pointer object-contain"
      />

      {/* Center Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 sm:px-8">
        {/* Previous 5 seconds */}
        <button
          type="button"
          onClick={() => seek(-5)}
          aria-label="Back 5 seconds"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition duration-200 hover:scale-110 hover:bg-black/80 group-hover:opacity-100 sm:h-14 sm:w-14"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Play */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:scale-110 hover:bg-black/85 sm:h-20 sm:w-20"
          >
            <Play size={32} fill="currentColor" className="ml-1" />
          </button>
        )}

        {/* Next 5 seconds */}
        <button
          type="button"
          onClick={() => seek(5)}
          aria-label="Forward 5 seconds"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition duration-200 hover:scale-110 hover:bg-black/80 group-hover:opacity-100 sm:h-14 sm:w-14"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/95 via-black/70 to-transparent px-3 pb-3  opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 ">
        {/* Progress */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="mb-2 h-1 w-full cursor-pointer accent-green-500"
          aria-label="Video progress"
        />

        <div className="flex items-center gap-1 text-white sm:gap-2">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="rounded p-1.5 transition hover:bg-white/10"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          {/* Mute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="rounded p-1.5 transition hover:bg-white/10"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* Volume */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="hidden w-20 cursor-pointer accent-green-500 sm:block"
            aria-label="Volume"
          />

          {/* Time */}
          <span className="ml-1 text-xs tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="ml-auto flex items-center gap-1">
            {/* Picture in Picture */}
            <button
              type="button"
              onClick={handlePictureInPicture}
              aria-label="Picture in picture"
              className="rounded p-1.5 transition hover:bg-white/10"
            >
              <PictureInPicture size={19} />
            </button>

            {/* Settings */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSettings((previous) => !previous)}
                aria-label="Settings"
                className="rounded p-1.5 transition hover:bg-white/10"
              >
                <Settings size={19} />
              </button>

              {showSettings && (
                <div className="absolute bottom-10 right-0 w-36 rounded-lg bg-black/95 p-2 shadow-xl">
                  <p className="px-2 py-1 text-xs text-gray-400">
                    Playback speed
                  </p>

                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => changePlaybackRate(rate)}
                      className={`block w-full rounded px-2 py-1.5 text-left text-sm hover:bg-white/10 ${
                        playbackRate === rate ? "text-green-400" : "text-white"
                      }`}
                    >
                      {rate === 1 ? "Normal" : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="rounded p-1.5 transition hover:bg-white/10"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
