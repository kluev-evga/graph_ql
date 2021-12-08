import { gql } from 'apollo-boost';


export const typeDefs = gql`
    extends type Mutation {
        ToggleCartHidden: Boolean!
    }
`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

// toggleCartHidden: (_root, _args, _content, _info) => 

// toggleCartHidden: (_root, _args, { cache }) => {
//     const data = cache.readQuery({
//         query: GET_CART_HIDDEN,
//         variables: {}
//     })
// }

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.wiriteQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden}
            });

            return !cartHidden;
        }
    }
}