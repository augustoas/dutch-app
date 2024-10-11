import { GraphQLClient } from 'graphql-request';

const baseUrl = 'https://mock.shop/api';

export const graphQLClient = new GraphQLClient(baseUrl, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function to fetch data from the API
export const fetchGraphQLData = async (query: string, variables?: Record<string, any>) => {
  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    // Here we can handle errors in a better way
    console.error("GraphQL request failed", error);
    throw error;
  }
};
