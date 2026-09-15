import { useEffect, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

import { useUploadVideo, useUpdateVideo } from "../videoHooks";
import { Button, Input } from "../../../components/index";
import { useNavigate } from "react-router-dom";

function VideoForm({ mode = "create", video = null }) {
  const isEdit = mode === "edit";

  const uploadMutation = useUploadVideo();
  const updateMutation = useUpdateVideo();

  const navigate = useNavigate();

  const mutation = isEdit ? updateMutation : uploadMutation;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublished: true,
    video: null,
    thumbnail: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (!isEdit || !video) return;

    setFormData({
      title: video.title || "",
      description: video.description || "",
      video: null,
      thumbnail: null,
      isPublished: video.isPublished || false,
    });

    setThumbnailPreview(video.thumbnail?.url || "");
  }, [isEdit, video]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0] || null;

      setFormData((previous) => ({
        ...previous,
        [name]: file,
      }));

      if (name === "thumbnail" && file) {
        const previewUrl = URL.createObjectURL(file);
        setThumbnailPreview(previewUrl);
      }

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("isPublished", formData.isPublished);

    if (formData.video) {
      data.append("video", formData.video);
    }

    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    if (isEdit) {
      updateMutation.mutate(
        {
          videoId: video._id,
          formData: data,
        },
        {
          onSuccess: () => {
            navigate("/profile", { replace: true });
          },
        },
      );

      return;
    }

    uploadMutation.mutate(data, {
      onSuccess: () => {
        navigate("/profile", { replace: true });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-600 text-white rounded-lg p-5 border-4 border-gray-700 shadow-lg "
    >
      {/* Title */}
      <Input
        htmlFor="Title"
        label="Title"
        placeholder="Enter video title"
        type="text"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500 "
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        maxLength={150}
        autoComplete="on"
      />

      {/* Description */}

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium  "
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell viewers about your video"
          rows={6}
          maxLength={5000}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
          autoComplete="on"
          required
        />
      </div>

      {/* Video */}
      {!isEdit && (
        <div>
          <label
            htmlFor="videoFile"
            className="mb-2 block text-sm font-medium  "
          >
            Video
          </label>

          <input
            id="videoFile"
            name="video"
            type="file"
            accept="video/*"
            onChange={handleChange}
            required
            className="block w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
      )}

      {/* Thumbnail */}
      <div>
        <label htmlFor="thumbnail" className="mb-2 block text-sm font-medium  ">
          {isEdit ? "Change thumbnail" : "Thumbnail"}
        </label>

        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required={!isEdit}
          className="block w-full rounded-lg border border-gray-300 p-2 text-sm"
        />

        {thumbnailPreview && (
          <div className="mt-4 overflow-hidden rounded-lg">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="aspect-video w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Error */}
      {mutation.isError && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {mutation.error?.response?.data?.message ||
            mutation.error?.message ||
            "Something went wrong."}
        </p>
      )}

      {/* visibility */}
      <div>
        <label htmlFor="isPublished" className="mb-2 block text-sm font-medium">
          Visibility
        </label>

        <select
          id="isPublished"
          name="isPublished"
          value={formData.isPublished}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-3  outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
        >
          <option value="true" className="text-gray-950">
            Published
          </option>
          <option value="false" className="text-gray-950">
            Private
          </option>
        </select>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isEdit ? (
          <>
            <Upload size={18} />
            {mutation.isPending ? "Updating..." : "Update Video"}
          </>
        ) : (
          <>
            <Upload size={18} />
            {mutation.isPending ? "Uploading..." : "Upload Video"}
          </>
        )}
      </Button>
    </form>
  );
}

export default VideoForm;
