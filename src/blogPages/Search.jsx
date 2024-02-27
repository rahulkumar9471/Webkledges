import React, { useContext, useEffect, useState } from "react";
import PortraitCard from "../blogComponents/PortraitCard";
import { AppContext } from "../context/AppContext";
import Spinner from "../blogComponents/Spinner";
import BlogSidebar from "../blogTemplate/BlogSidebar";
import { useParams } from "react-router-dom";

const Search = () => {
  const API_KEY = "AIzaSyCYgDAPHqBrC20ob9WMWhCV5Vv8kSPLtkM";
  const BLOG_ID = "3226864875966992925";
  const { populars } = useContext(AppContext);
  const [searchDatas, setSearchDatas] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { q } = useParams();

  function stripHtmlTags(html) {
    // Replace &nbsp; with a space
    const withoutNbsp = html.replace(/&nbsp;/g, " ");

    // Remove all other HTML tags
    return withoutNbsp.replace(/<[^>]+>/g, "");
  }

  useEffect(() => {
    const searchFetchData = async () => {
      setSearchLoading(true);
      try {
        const response = await fetch(
          `https://blogger.googleapis.com/v3/blogs/${BLOG_ID}/posts/search?q=${q}&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }

        const data = await response.json();

        setSearchDatas(
          data.items.map((item) => ({
            ...item,
            content: stripHtmlTags(item.content),
          }))
        );
      } catch (err) {
        console.error("Error Msg", err);
        setSearchDatas([]);
      }
      setSearchLoading(false);
    };
    searchFetchData();
  }, [q]);

  if (searchLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="mt-10">
        <div className="lg:flex gap-x-10 px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div className="w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12 ">
            <div>
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold">
                Search Results
              </h1>
              <div className="flex justify-center items-center">
                <div className="w-2/12 border-[1.5px] border-[#000] mt-4"></div>
                <div className="w-10/12 border-[1px] border-gray mt-4"></div>
              </div>
            </div>
            <div className="">
              <div className="lg:flex gap-x-10">
                <div className="container">
                  <div
                    className={`grid grid-cols-1 ${
                      searchDatas.length > 0
                        ? "md:grid-cols-2 lg:grid-cols-2 gap-x-10"
                        : ""
                    }`}
                  >
                    {searchDatas.length > 0 ? (
                      searchDatas.map((searchData) => (
                        <PortraitCard key={searchData.id} {...searchData} />
                      ))
                    ) : (
                      <div className="flex justify-center items-center ">
                        Not Found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BlogSidebar populars={populars} />
        </div>
      </section>
    </>
  );
};

export default Search;
