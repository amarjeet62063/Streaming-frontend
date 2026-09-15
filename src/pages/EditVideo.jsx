import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/common/Loading";
import Error from "../components/common/Error";

import { useVideo } from "../features/videos/videoHooks";
import VideoForm from "../features/videos/components/VideoForm";

function EditVideo() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const {
    data: videoResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useVideo(videoId);

  const video = videoResponse?.data;

  if (isLoading) {
    return <Loading text="Loading video..." />;
  }

  if (isError || !video) {
    return (
      <Error
        title="Unable to load video"
        message={
          error?.response?.data?.message || error?.message || "Video not found."
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Edit Video</h1>

        <p className="mb-8 text-sm text-gray-500">
          Update your video's information.
        </p>

        <VideoForm
          mode="edit"
          video={video}
          onSuccess={() => navigate(`/watch?v=${video._id}`)}
        />
      </div>
    </main>
  );
}

export default EditVideo;
