import { useState } from "react";
import { Loading, Pagination } from "../components";
import VideoCard from "../features/videos/components/VideoCard";
import { useAllvideos } from "../features/videos/videoHooks";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { page } = useParams();

  const CurrentPage = Number(page) > 0 ? Number(page) : 1;
  const {
    data: videosResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllvideos(CurrentPage);
  const pagegination = videosResponse?.data;
  const videos = videosResponse?.data?.docs || [];
  console.log(page);

  const goToPage = (pageNumber) => {
    if (pageNumber === 1) {
      navigate("/");
    } else {
      navigate(`/page/${pageNumber}`);
    }
  };

  if (isLoading) {
    return <Loading text="Loading videos..." />;
  }

  if (isError) {
    return (
      <Error
        title="Unable to load videos"
        message={
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <div>
      {videos.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
      <Pagination
        page={pagegination?.page}
        totalPages={pagegination?.totalPages}
        hasNextPage={pagegination?.hasNextPage}
        hasPrevPage={pagegination?.hasPrevPage}
        onNext={() => goToPage(CurrentPage + 1)}
        onPrevious={() => goToPage(CurrentPage - 1)}
      />
    </div>
  );
}

export default Home;
