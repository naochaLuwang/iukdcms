import Image from "next/image";
import React from "react";

interface AlbulmCardProps {
  image: string;
  title: string;
  count: number;
}

const AlbulmCard: React.FC<AlbulmCardProps> = ({ image, title, count }) => {
  return (
    <div className="flex flex-col items-center w-64 h-64 px-10 py-2 space-y-4 bg-blue-100 rounded-md shadow-md">
      <div className="relative h-48 border-2 w-60">
        <Image src={image} alt="" fill style={{ objectFit: "fill" }} />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="font-medium text-neutral-500">{title}</h1>
        <p className="text-sm text-neutral-500">({count}) images</p>
      </div>
    </div>
  );
};

export default AlbulmCard;
