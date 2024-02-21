import React, { useEffect, useState } from "react";
import PortraitCard from "../blogComponents/PortraitCard";
import BlogSidebar from "../blogTemplate/BlogSidebar";
import Breadcrumb from "../blogComponents/Breadcrumb ";

const Category = () => {
  const API_KEY = "AIzaSyCYgDAPHqBrC20ob9WMWhCV5Vv8kSPLtkM";
  const BLOG_ID = "3226864875966992925";

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const categoryData = async () => {
      try {
        const categoryResponse = await fetch(
          `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch error");
        }

        const categorysData = await categoryResponse.json();

        setCategorys(categorysData.items);
      } catch (e) {
        console.error("Error fetch", e);
      }
    };
    categoryData();
  });

  return (
    <>
      <Breadcrumb />
      <section className="mt-10">
        <div className="lg:flex gap-x-10 px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div className="w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12 ">
            <div>
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold">
                Latest Posts
              </h1>
              <div className="flex justify-center items-center">
                <div className="w-2/12 border-[1.5px] border-[#000] mt-4"></div>
                <div className="w-10/12 border-[1px] border-gray mt-4"></div>
              </div>
            </div>
            <div className="">
              <div className="lg:flex gap-x-10">
                <div className="container">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10">
                    {categorys.map((category) => (
                      <PortraitCard key={category.id} {...category} />
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <button className="border-2 border-[#418160] font-semibold text-[#418160] hover:bg-[#418160] hover:text-[#fff] py-2 px-4 rounded-full">
                      Loading...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BlogSidebar */}
        </div>
      </section>
    </>
  );
};

export default Category;
