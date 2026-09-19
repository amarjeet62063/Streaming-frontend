import { useParams } from "react-router-dom";
import { useCreatorProfile } from "../creatorHooks";
import { useState } from "react";

function CreatorProfile() {
  const { user_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [profileQuery, videosQuery] = useCreatorProfile(user_id, currentPage);

  console.log(profileQuery, videosQuery);
  // console.log(user_id);

  return <div></div>;
}

export default CreatorProfile;
