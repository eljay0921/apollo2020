import React from "react";
import { useParams, Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  # for apollo part
  query getMovie($id: Int!) {
    # query to server
    movie(id: $id) {
      title
      medium_cover_image
      language
      genres
      description_intro
    }

    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

//#region styles

const BackGround = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin: 2% 0 5%;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  margin-bottom: 5%;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const ContainerSuggestion = styled.div`
  width: 100%
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Suggestion = styled.label`
  margin-right: 1.5vw;
  font-style: italic;
  text-decoration: underline;
`;

const GoHomeLink = styled(Link)`
  width: 100%;
  color: white;
  text-decoration: none;
  position: relative;
  top: -30px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
//#endregion

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <>
      <BackGround>
        <Container>
          <Column>
            <GoHomeLink to="/">{data ? "> Home" : ""}</GoHomeLink>
            <Title>{loading ? "Loading..." : `${data.movie.title}`}</Title>
            <Subtitle>
              {data?.movie?.language} · {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
            <ContainerSuggestion>
              {data?.suggestions?.map((item) => (
                <StyledLink to={`/${item.id}`}>
                  <Suggestion>{item.title}</Suggestion>
                </StyledLink>
              ))}
            </ContainerSuggestion>
          </Column>
          <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
      </BackGround>
    </>
  );
};
