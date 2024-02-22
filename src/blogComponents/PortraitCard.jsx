import React from "react";
import banner from "../img/banner.jpg";
import { FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PortraitCard = (props) => {
  // Convert props.published to a Date object
  const publishedDate = new Date(props.published);
  // Get month, day, and year using toLocaleString and getFullYear methods
  const month = publishedDate.toLocaleString("en-US", { month: "long" });
  const day = publishedDate.toLocaleString("en-US", { day: "2-digit" });
  const year = publishedDate.getFullYear();

  return (
    <>
      <div className="W-full mt-10">
        <div className="">
          <Link to={`/Blog/${props.id}`}>
            <div className="h-[200px] overflow-hidden rounded-[4px]">
              <img
                src={banner}
                className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                alt=""
              />
            </div>
          </Link>
          <div className="mt-5">
            <Link to={`/Blog/${props.id}`}>
              <h1 className="text-2xl font-bold mb-2 hover:text-[#418160]">
                {
                  props.title.length > 65 ? 
                  (props.title.substr(0, 65)) + '...' : 
                  (props.title)
                }
              </h1>
            </Link>
            <p className="mt-1">
              {
                props.content.length > 110 ? 
                (props.content.substr(0,110)) + '...': (
                  props.content
                )
              }
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div>
              <h1>{props.author.displayName}</h1>
              <p>
                {month} {day}, {year}
              </p>
            </div>
            <div className="cursor-pointer">
              <FaRegBookmark />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortraitCard;
