import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

//#region styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;
//#endregion

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <SubTitle>I Love Graphql</SubTitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {!loading &&
        data &&
        data.movies.map((item) => <Movie key={item.id} id={item.id} />)}
    </Container>
  );

  if (loading) {
    return "loading...";
  }

  if (data && data.movies) {
    return data.movies.map((movie) => <h1 key={movie.id}>{movie.id}</h1>);
  }

  return <h1>Home</h1>;
};
