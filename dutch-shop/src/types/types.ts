export interface Price {
  amount: string;
  currencyCode: string;
}

export interface VariantNode {
  price: Price;
}

export interface VariantEdge {
  node: VariantNode;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    id: string;
    url: string;
  } | null;
  variants: {
    edges: VariantEdge[];
  };
}

export interface ProductsResponse {
  products: {
    edges: {
      node: Product;
    }[];
  };
}

export interface CartItem extends Product {
  quantity: number;
}