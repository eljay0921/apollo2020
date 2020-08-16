import ApolloClient from "apollo-boost";

const apClient = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    // Graphql API 서버로부터 받은 Type의 이름과 동일하게 작성해야 한다. "Movie"
    Movie: {
      isLiked: () => false, // isLiked라는 Property 생성 => 함수형으로
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        // console.log(id, isLiked, cache);
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
            // ex) medium_cover_image: "blah blah blah~",
          },
        });
      },
    },
  },
}); // 만들어둔 Graphql API 서버

export default apClient;
