import { useMyVideos } from "../videoHooks";
import VideoCard from "./VideoCard";
import { Loading, Error, Pagination } from "../../../components";
import { useState } from "react";

function UserVideos() {
  const [page, setPage] = useState(1);
  const {
    data: videosResponse,
    isLoading: isVideosLoading,
    isError: isVideosError,
    error: videosError,
    refetch,
  } = useMyVideos(page);

  const data = videosResponse?.data;

  const videos = data?.docs || [];
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My Videos</h2>

        <span className="text-sm text-gray-900">
          {isVideosLoading ? "Loading..." : `${data?.totalDocs ?? 0} videos`}
        </span>
      </div>

      {/* Videos Loading */}

      {isVideosLoading && (
        <Loading text="Loading videos..." fullScreen={false} />
      )}

      {/* Videos Error */}

      {isVideosError && (
        <Error
          title="Unable to load videos."
          message={
            videosError?.response?.data?.message ||
            videosError?.message ||
            "Unable to load videos."
          }
          fullScreen={false}
          onRetry={refetch}
        />
      )}

      {/* No Videos */}

      {!isVideosLoading && !isVideosError && videos.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          You haven't uploaded any videos yet.
        </p>
      )}

      {/* Video Cards */}

      {!isVideosLoading && !isVideosError && videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>

          {/* Pagination */}

          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            hasPrevPage={data.hasPrevPage}
            hasNextPage={data.hasNextPage}
            onPrevious={() => setPage((previous) => previous - 1)}
            onNext={() => setPage((previous) => previous + 1)}
          />
        </>
      )}
    </div>
  );
}

export default UserVideos;
