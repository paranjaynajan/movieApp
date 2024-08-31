import movie1 from "@/public/assets/images/image_1.png"
import movie2 from "@/public/assets/images/image_2.png"
import movie3 from "@/public/assets/images/image_3.png"
import { StaticImageData } from "next/image";
export interface IMovie {
    id: number;
    title: string;
    year: string;
    imageSrc: any; 
}

const moviesData = [
    {
        id: 1,
        title: "Movie 1",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 2,
        title: "Movie 2",
        year: "2021",
        imageSrc: movie2
    },
    {
        id: 3,
        title: "Movie 3",
        year: "2021",
        imageSrc: movie3
    },
    {
        id: 4,
        title: "Movie 4",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 5,
        title: "Movie 5",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 6,
        title: "Movie 6",
        year: "2021",
        imageSrc: movie2
    },
    {
        id: 7,
        title: "Movie 7",
        year: "2021",
        imageSrc: movie3
    },
    {
        id: 8,
        title: "Movie 8",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 9,
        title: "Movie 9",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 10,
        title: "Movie 10",
        year: "2021",
        imageSrc: movie2
    },
    {
        id: 11,
        title: "Movie 11",
        year: "2021",
        imageSrc: movie3
    },
    {
        id: 12,
        title: "Movie 12",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 13,
        title: "Movie 13",
        year: "2021",
        imageSrc: movie1
    },
    {
        id: 14,
        title: "Movie 14",
        year: "2021",
        imageSrc: movie2
    },
    {
        id: 15,
        title: "Movie 15",
        year: "2021",
        imageSrc: movie3
    },
    {
        id: 16,
        title: "Movie 16",
        year: "2021",
        imageSrc: movie1
    }
]

export default moviesData
