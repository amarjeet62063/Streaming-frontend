import VideoForm from "../features/videos/components/VideoForm";

function Upload() {
  return (
    <main className="min-h-[calc(100vh-4rem)] ">
      <div className="mx-auto w-full max-w-3xl px-4 py-5  ">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Upload Video</h1>

        <p className="mb-8 text-sm text-gray-800">
          Share your video with the StreamForge community.
        </p>

        <VideoForm mode="create" />
      </div>
    </main>
  );
}

export default Upload;
