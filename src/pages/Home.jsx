import { useState } from "react";
import { Pagination } from "../components";
import { useCurrentUser } from "../features/auth/authHooks";
import VideoCard from "../features/videos/components/VideoCard";
import { useAllvideos } from "../features/videos/videoHooks";

function Home() {
  const [page, setPage] = useState(1);
  const { data } = useAllvideos(page);
  const pagegination = data?.data;
  const videos = data?.data?.docs || [];
  console.log(pagegination);

  return (
    <div>
      <div className="mt-2 mb-3 px-3 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video._id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
      <Pagination
        page={pagegination?.page}
        totalPages={pagegination?.totalPages}
        hasNextPage={pagegination?.hasNextPage}
        hasPrevPage={pagegination?.hasPrevPage}
        onNext={() => setPage((previus) => previus + 1)}
        onPrevious={() => setPage((previus) => previus - 1)}
      />
    </div>
  );
}

export default Home;
