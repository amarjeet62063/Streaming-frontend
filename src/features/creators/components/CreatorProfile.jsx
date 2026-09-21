import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Pagination } from "../../../components";
import VideoCard from "../../../components/VideoCard";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

import { useCreatorProfile, useSubscriptionToggel } from "../creatorHooks";

function CreatorProfile() {
  const { user_id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [
    {
      data: profileResponse,
      isPending: isProfilePending,
      isError: isProfileError,
      error: profileError,
    },
    {
      data: videosResponse,
      isPending: isVideosPending,
      isError: isVideosError,
      error: videosError,
    },
  ] = useCreatorProfile(user_id, currentPage);

  // console.log(data);
  const profile = profileResponse?.data;
  const pagination = videosResponse?.data;

  const videos = pagination?.docs ?? [];

  const isLoading = isProfilePending || isVideosPending;

  const isError = isProfileError || isVideosError;

  const error = profileError || videosError;
  const { mutate } = useSubscriptionToggel(profile?._id);

  const handleOnclicke = () => {
    mutate();
  };

  if (isLoading) {
    return <Loading text="Loading creator..." />;
  }

  if (isError) {
    return (
      <Error
        title="Unable to load creator"
        message={
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Cover */}
      <div className="h-52 w-full overflow-hidden bg-gray-200">
        {profile?.coverimage?.url ? (
          <img
            src={profile.coverimage.url}
            alt={`${profile.username}'s cover`}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {/* Creator */}
      <section className="mx-auto max-w-6xl px-4 py-6 flex justify-between pr-5  sm:pr-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="-mt-16 shrink-0">
            {profile?.avatar?.url ? (
              <img
                src={profile.avatar.url}
                alt={profile.username}
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-gray-300" />
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile?.fullname}
            </h1>

            <p className="text-gray-500">@{profile?.username}</p>

            <div className="mt-2 flex gap-4 text-sm text-gray-600">
              <span>{profile?.subscriberCount ?? 0} subscribers</span>
            </div>
          </div>

          {/* Subscribe */}
        </div>
        <Button
          type="button"
          onClick={handleOnclicke}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold h-12 ${
            profile?.isSubscribed
              ? "bg-gray-200 text-gray-900"
              : "bg-gray-900 text-white"
          }`}
        >
          {profile?.isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </section>

      {/* Videos */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">Videos</h2>

        {videos.length === 0 ? (
          <p className="text-gray-500">No videos available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}

        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          onNext={() => setCurrentPage((page) => page + 1)}
          onPrevious={() => setCurrentPage((page) => page - 1)}
        />
      </section>
    </main>
  );
}

export default CreatorProfile;
