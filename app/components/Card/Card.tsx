import React from "react";
import Image, { StaticImageData } from "next/image";

interface MovieCardProps {
  title: string;
  year: string;
  imageSrc: StaticImageData|string;
}

const Card: React.FC<MovieCardProps> = ({ title, year, imageSrc }) => {
  return (
    <div className="max-w-xs bg-[#092C39] rounded-lg overflow-hidden cursor-pointer  p-2 transform transition-transform duration-300 hover:scale-105">
      <Image
        src={imageSrc}
        alt={title}
        className="w-full h-auto object-cover"
        width={400}
        height={600}
      />
      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-white text-[20px] font-medium">{title}</h2>
        <p className="text-white text-[14px]">{year}</p>
      </div>
    </div>
  );
};

export default Card;
