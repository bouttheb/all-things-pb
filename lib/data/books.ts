export interface Book {
  title: string;
  url: string;
  image: string;
  description?: string;
}

export interface BookSeries {
  title: string;
  description: string;
  volumes: Book[];
}

export const FEATURED_BOOK: Book = {
  title: "Shepherd of Souls",
  url: "https://amzn.to/4b6i4SM",
  image: "/images/shepherd-of-souls.jpg",
  description:
    "My book on the true nature of pastoral ministry and how it applies to the whole body of Christ.",
};

export const SPIRIT_OF_LIFE_SERIES: BookSeries = {
  title: "Spirit of Life Series",
  description:
    "Spirit of Life is a five-part daily devotional series that focuses on the key biblical passages that speak of the Holy Spirit. What better way to build a deeper spiritual life than to learn about the Holy Spirit as you seek God\u2019s face?",
  volumes: [
    {
      title: "Volume 1",
      url: "https://amzn.to/407qYdC",
      image: "/images/spirit-of-life-1.jpg",
    },
    {
      title: "Volume 2",
      url: "https://amzn.to/40LJyYR",
      image: "/images/spirit-of-life-2.jpg",
    },
    {
      title: "Volume 3",
      url: "https://amzn.to/4b1es4a",
      image: "/images/spirit-of-life-3.jpg",
    },
    {
      title: "Volume 4",
      url: "https://amzn.to/3OD3F9b",
      image: "/images/spirit-of-life-4.jpg",
    },
    {
      title: "Volume 5",
      url: "https://amzn.to/4s6mS1T",
      image: "/images/spirit-of-life-5.jpg",
    },
  ],
};
