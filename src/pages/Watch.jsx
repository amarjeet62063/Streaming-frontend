import { useSearchParams } from "react-router-dom";

import VideoPlayerCard from "../features/videos/components/VideoPlayer";
import { useVideo } from "../features/videos/videoHooks";

function Watch() {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");
  const { data: videosResponse } = useVideo(videoId);
  const videos = videosResponse?.data;

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-5xl px-2 py-3 sm:px-4 sm:py-6">
        <VideoPlayerCard video={videos} />
      </div>
    </main>
  );
}

export default Watch;
