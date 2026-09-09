import { Link } from "react-router-dom";
import { MoreVertical, Play } from "lucide-react";

function VideoCard({ video }) {
  return (
    <article className="group min-w-0">
      {/* Thumbnail */}
      <Link
        to={`/videos/${video._id}`}
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
      <div className="mt-3 flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {video?.owner?.avatar?.url ? (
            <img
              src={video.owner.avatar.url}
              alt={video.owner.username || "User"}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
              <Play size={16} className="text-gray-500" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <Link
            to={`/videos/${video._id}`}
            className="line-clamp-2 font-semibold leading-5 text-gray-900 transition hover:text-green-600"
          >
            {video.title}
          </Link>

          <p className="mt-1 truncate text-lg text-gray-800">
            {video.owner?.username
              ? `@${video.owner.username}`
              : "Unknown user"}
          </p>

          <p className="text-sm text-gray-950">
            {video.views ?? 0} views
            {video.createdAt && (
              <>
                {" • "}
                {new Date(video.createdAt).toLocaleDateString()}
              </>
            )}
          </p>
        </div>

        {/* More */}
        <button
          type="button"
          className="h-fit shrink-0 rounded-full p-1.5 text-gray-500 opacity-0 transition hover:bg-gray-100 group-hover:opacity-100"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </article>
  );
}

export default VideoCard;
