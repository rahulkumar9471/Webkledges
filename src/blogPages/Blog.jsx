import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import banner from "../img/banner.jpg";
import BlogSidebar from "../blogTemplate/BlogSidebar";
import {
  FaFacebook,
  FaInstagram,
  FaRegBookmark,
  FaRegClock,
  FaRegFolder,
  FaTwitter,
} from "react-icons/fa6";
import SmallProfileBrif from "../blogComponents/SmallProfileBrif";
import { FaLinkedin } from "react-icons/fa";
import BlogComment from "../blogComponents/BlogComment";
import LeaveComment from "../blogComponents/LeaveComment";
import Spinner from "../blogComponents/Spinner";
import { AppContext } from "../context/AppContext";

const Blog = () => {

  const {populars} = useContext(AppContext);

  const API_KEY = "AIzaSyCYgDAPHqBrC20ob9WMWhCV5Vv8kSPLtkM";
  const BLOG_ID = "3226864875966992925"; 
  const [post, setPost] = useState([]); 
  const [loadingPost, setLoadingPost] = useState(true); 
  const [error, setError] = useState(null);

  const { id } = useParams();

  function stripHtmlTags(html) {
    // Replace &nbsp; with a space
    const withoutNbsp = html.replace(/&nbsp;/g, " ");

    // Remove all other HTML tags
    return withoutNbsp.replace(/<[^>]+>/g, "");
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPost(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }
        const data = await response.json();

        setPost(data);
        data.content = stripHtmlTags(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPost(false);
      }
    };
    fetchData();
  }, [id]);

  if (loadingPost) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Convert post.published to a Date object
  const publishedDate = new Date(post.published);
  // Get month, day, and year using toLocaleString and getFullYear methods
  const month = publishedDate.toLocaleString("en-US", { month: "long" });
  const day = publishedDate.toLocaleString("en-US", { day: "2-digit" });
  const year = publishedDate.getFullYear();

  return (
    <>
      <section className="mt-10">
        <div className="px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div className="w-full sm:w-full md:w-full">
            <div className="flex flex-wrap gap-x-1 text-l font-semibold">
              <Link to="">Home</Link>
              <p>/</p>
              <Link to="">Web Development</Link>
              <p>/</p>
              <Link to="">{post.title}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="lg:flex gap-x-10 px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div className="w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12 ">
            <div className="">
              <div className="lg:flex gap-x-10">
                <div className="container">
                  <div className="grid grid-cols-1 gap-x-10">
                    <div className="W-full mt-10">
                      <div className="">
                        <div className="relative h-[300px] overflow-hidden rounded-[4px]">
                          <img
                            src={banner}
                            className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                            alt=""
                          />
                          <span className="absolute right-3 top-6 mr-2 text-xl cursor-pointer z-10">
                            <FaRegBookmark fontSize={24} fill="#fff" />
                          </span>
                        </div>
                        <div className="mt-5">
                          <div className="flex justify-between items-center">
                            <div>
                              <h1 className="text-2xl font-bold">
                                {post.title}
                              </h1>
                              <div className="flex flex-wrap items-center mt-1 gap-x-4">
                                <h1>{post.author.displayName}</h1>
                                <div className="flex gap-x-1 items-center">
                                  <FaRegFolder />
                                  <p>Web Development</p>
                                </div>
                                <div className="flex gap-x-1 items-center">
                                  <FaRegClock />
                                  <p>
                                    {month} {day}, {year}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3">{post.content}</p>
                        </div>
                        <div className="w-full border-[1px] border-gray mt-4"></div>
                        <div className="mt-5 flex flex-wrap justify-center sm:justify-between md:justify-between items-center">
                          <div className="flex flex-wrap items-center gap-x-2">
                            <Link
                              to=""
                              className="font-semibold text-[#203656] hover:text-[#418160]"
                            >
                              #Web
                            </Link>
                            <Link
                              to=""
                              className="font-semibold text-[#203656] hover:text-[#418160]"
                            >
                              #Development
                            </Link>
                            <Link
                              to=""
                              className="font-semibold text-[#203656] hover:text-[#418160]"
                            >
                              #Web Development
                            </Link>
                          </div>
                          <div className="flex justify-around items-center gap-x-2 mt-4 sm:mt-4 md:mt-0">
                            <Link to="">
                              <button className="shadow-xl flex items-center justify-center p-2 w-10 h-10 rounded-full">
                                <FaFacebook className="text-xl hover:text-[#418160]" />
                              </button>
                            </Link>
                            <Link to="">
                              <button className="shadow-xl flex items-center justify-center p-2 w-10 h-10 rounded-full">
                                <FaInstagram className="text-xl hover:text-[#418160]" />
                              </button>
                            </Link>
                            <Link to="">
                              <button className="shadow-xl flex items-center justify-center p-2 w-10 h-10 rounded-full">
                                <FaTwitter className="text-xl hover:text-[#418160]" />
                              </button>
                            </Link>
                            <Link to="">
                              <button className="shadow-xl flex items-center justify-center p-2 w-10 h-10 rounded-full">
                                <FaLinkedin className="text-xl hover:text-[#418160]" />
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="mt-10">
                          <SmallProfileBrif />
                        </div>
                        <div className="mt-10">
                          <BlogComment />
                        </div>
                        <div className="mt-10">
                          <LeaveComment />
                        </div>
                      </div>
                    </div>
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

export default Blog;
