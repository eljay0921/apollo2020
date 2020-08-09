import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_MOVIE = gql`
  # for apollo part
  query getMovie($id: Int!) {
    # query to server
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default () => {
  const { id } = useParams();

  // 위 gql에서 필요한 id를 넘겨줘야 한다.
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }, // equl { id : id }
  });

  if (loading) {
    return "loading...";
  }

  if (data && data.movie) {
    return data.movie.title;
  }

  return "Detail";
};
