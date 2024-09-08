import React from "react";
import frame from "../assets/frame.png";

interface ImageComponentProps {
  image: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ image }) => {
  
  return (
    <div className="flex flex-col w-1/2 gap-8">
      <div className=" relative mx-[120px] shadow-2xl w-max border-2 border-white">
        <img src={image} alt="Plant Disease" className="w-[500px] h-[500px]" />
        <img src={frame} alt="Frame" className=" absolute top-[8px] left-[0px] w-[500px] h-[500px]" />
      </div>
      <p className="font-bold mx-[120px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio sequi,
        similique, architecto vitae earum non sed ipsam repudiandae aliquid
        tempore laboriosam quam in deleniti et totam impedit placeat fugiat hic?
      </p>
    </div>
  );
};

export default ImageComponent;
