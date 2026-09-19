import { Link, useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { useCurrentUser } from "../features/auth/authHooks";

function VideoCard({ video }) {
  const navigat = useNavigate();
  const { data: userId } = useCurrentUser();
  const currentUser = userId?.data?._id;

  const handelNavigation = () => {
    currentUser === video?.owner?._id
      ? navigat("/profile")
      : navigat(`/profile/${video?.owner?._id}`);
  };
  return (
    <article className="group min-w-0">
      {/* Thumbnail */}
      <Link
        to={`/watch?v=${video._id}`}
        className="relative block aspect-video overflow-hidden rounded-xl bg-gray-200"
      >
        {video?.thumbnail?.url ? (
          <img
            src={video.thumbnail.url}
            alt={video.title || "Video thumbnail"}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play size={40} className="text-gray-400" />
          </div>
        )}
      </Link>

      {/* Video Info */}
      <div className="mt-1.5 flex gap-3 ">
        {/* Avatar */}

        <div className="shrink-0">
          <button onClick={handelNavigation}>
            {video?.owner?.avatar?.url ? (
              <img
                src={video.owner.avatar.url}
                alt={video.owner.username || "User"}
                className="h-9 w-9 rounded-full cursor-pointer object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                <Play size={16} className="text-gray-500" />
              </div>
            )}
          </button>
        </div>
        {/* Details */}
        <div className="min-w-0 flex-1">
          <Link
            to={`/watch?v=${video._id}`}
            className="line-clamp-2 font-semibold leading-5 text-gray-900 transition hover:text-green-600"
          >
            {video.title}
          </Link>

          <p
            className=" cursor-pointer truncate block text-lg text-gray-800"
            onClick={handelNavigation}
          >
            {video.owner?.username
              ? `@${video.owner.username}`
              : "Unknown user"}
          </p>
          <Link to={`/watch?v=${video._id}`}>
            <p className="text-sm text-gray-950">
              {video.views ?? 0} views
              {video.createdAt && (
                <>
                  {" • "}
                  {new Date(video.createdAt).toLocaleDateString()}
                </>
              )}
            </p>
          </Link>
        </div>
        {/* More */}
      </div>
    </article>
  );
}

export default VideoCard;
