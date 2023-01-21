// dummy data
export function fetchCount() {
  return new Promise<{ data: Product[] }>((resolve) =>
    setTimeout(() => resolve({ data: [{
        "name": "hero Product",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "hero": "OMG This just came out today!",
        "image": "https://via.placeholder.com/300",
        "category": "drink"
      },{
        "name": "Product 1",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "info": "This is the latest and greatest product from Derp corp.",
        "image": "https://via.placeholder.com/300",
        "category": "snack"
      },{
        "name": "Product 2",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "offer": "BOGOF",
        "image": "https://via.placeholder.com/300",
        "category": "other"
      },{
        "name": "Product 3",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "image": "https://via.placeholder.com/300",
        "category": "drink"
      },{
        "name": "Product 4",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "offer": "No srsly GTFO",
        "image": "https://via.placeholder.com/300",
        "category": "snack"
      },{
        "name": "Product 5",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "image": "https://via.placeholder.com/300",
        "category": "other"
      },{
        "name": "Product 6",
        "detail": "Lorem ipsum dolor sit amet",
        "price": "99",
        "info": "This is the latest and greatest product from Derp corp.",
        "offer": "info with offer",
        "image": "https://via.placeholder.com/300",
        "category": "drink"
      }] }), 500)
  );
}

export interface Product {
  "name": string;
  "category": 'snack' | 'drink' | 'other';
	"detail": string;
	"price": string;
	"offer"?: string;
	"image": string;
	"hero"?: string;
	"info"?: string;
}