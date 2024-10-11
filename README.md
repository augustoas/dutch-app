# Dutch Assesment / Vue 3 / Shopify

## Built with

Vite, Vue3, Pinia, Router, TypeScript, GraphQl, Tailwind

## Project structure

- src
    - api -> This folder contains the apiClient.ts which is a generic graphQl call so can be reused for another queries and /queries folder
        - queries -> Here we can modularized our queries and in this case we only needed to get products.
    - assets
    - components -> In this folder components are placed. Crated a basic TopBar to show the shop name and cart
        - products -> ProductList and ProductCard component.
            - ProductList -> Here on the onMounte I am trying to show the products from the store inmediately so there is no delay for the client and check if there are new products as well so keeping the products updated. It is commented on the component.
    - stores
        - cartStore -> With this store cart can be access from anywhere, add and remove method are defined and also managing to store the cart on localStorage for persistence.
        - productStore -> This store was created to avoid fetching products from the API everytime we come back to the HomePage so it helps improve performance.
    - types -> In this folder we should store types. For this assesment only one file was created but can be modularized
    - views -> Main views for our app. Which are HomePage '\' and CartPage '\cart'

## Considerations

- For products I am always fetching first 20 and using the first variant to simplify the exercise.
- Included types
- Basic tailwind configuration
- Responsive design
- Didn't include icons this time to simplify the exercise.

## Run the project

cd dutch-shop
npm install
npm run dev

## Thanks

Hope you like it, happy to hear any feedback.

Thanks a lot for the opportunity.