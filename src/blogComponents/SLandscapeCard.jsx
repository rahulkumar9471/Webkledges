import React from "react";
import banner from "../img/banner.jpg";
import { Link } from "react-router-dom";

const SLandscapeCard = (props) => {
  const publishedDate = new Date(props.published);

  const month = publishedDate.toLocaleString("en-Us", { month: "long" });
  const day = publishedDate.toLocaleString("en-Us", { day: "2-digit" });
  const year = publishedDate.getFullYear();

  return (
    <>
      <div className="flex justify-start items-center gap-x-6">
        <Link to={`/Blog/${props.id}`}>
          <div className="overflow-hidden rounded-[4px] w-[150px] h-[110px]">
            <img
              src={banner}
              className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
              alt=""
            />
          </div>
        </Link>
        <div className="flex flex-col ">
          <div>
            <Link to={`/Blog/${props.id}`}>
              <h1 className="text-l font-bold hover:text-[#418160]">
                {props.title.length > 90
                  ? props.title.substr(0, 90) + "..."
                  : props.title}
              </h1>
            </Link>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center gap-x-2">
              <h1>{props.author.displayName}</h1>
              <p>
                {month} {day}, {year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SLandscapeCard;
