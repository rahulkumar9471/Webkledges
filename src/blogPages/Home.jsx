import React, { useEffect, useState } from "react";
import banner from "../img/banner.jpg";
import PortraitCard from "../blogComponents/PortraitCard";
import SLandscapeCard from "../blogComponents/SLandscapeCard";
import Carousel from "../blogComponents/Carousel";
import TopValues from "../blogComponents/TopValues";
import Info from "../blogComponents/Info";
import TopicsLists from "../blogComponents/TopicsLists";
import SponsoredAd from "../blogComponents/SponsoredAd";
import image1 from "../img/banner.jpg";
import image2 from "../img/banner.jpg";
import image3 from "../img/banner.jpg";
import Spinner from "../blogComponents/Spinner";

const images = [image1, image2, image3];

const Home = () => {
  // Constants for API configuration
  const API_KEY = "AIzaSyCYgDAPHqBrC20ob9WMWhCV5Vv8kSPLtkM";
  const BLOG_ID = "3226864875966992925";
  const MAX_RESULTS = 4;
  const FEATURED_RESULTS = 2;
  const SIDE_FEATURED_RESULTS = 3;
  const SIDE_POPULAR_RESULTS = 6;

  // State for featured, latest, and trending posts
  const [featureds, setFeatureds] = useState([]);
  const [sideFeatureds, setSideFeatureds] = useState([]);
  const [latests, setLatests] = useState([]);
  const [populars, setPopular] = useState([]);
  const [trendings, setTrendings] = useState([]);
  const [loading, setLoading] = useState(true);

  function stripHtmlTags(html) {
    // Replace &nbsp; with a space
    const withoutNbsp = html.replace(/&nbsp;/g, " ");

    // Remove all other HTML tags
    return withoutNbsp.replace(/<[^>]+>/g, "");
  }

  useEffect(() => {
    const fetchData = async (endpoint, setter, maxResults) => {
      setLoading(true);
      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        setter(
          data.items.map((item) => ({
            ...item,
            content: stripHtmlTags(item.content),
          }))
        );
      } catch (err) {
        console.error("Error fetching data : ", err);
      }
      setLoading(false);
    };

    // Fetch featured posts
    fetchData(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${FEATURED_RESULTS}`,
      setFeatureds,
      FEATURED_RESULTS
    );

    // Fetch side featured posts
    fetchData(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${SIDE_FEATURED_RESULTS}`,
      setSideFeatureds,
      SIDE_FEATURED_RESULTS
    );

    // Fetch latest posts
    fetchData(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${MAX_RESULTS}`,
      setLatests,
      MAX_RESULTS
    );
    // Fetch poplure posts
    fetchData(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${SIDE_POPULAR_RESULTS}`,
      setPopular,
      SIDE_POPULAR_RESULTS
    );

    // Fetch trending posts
    fetchData(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${MAX_RESULTS}`,
      setTrendings,
      MAX_RESULTS
    );
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="mt-5 mb-5">
        <div className="px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div
            className="w-full h-[500px] bg-no-repeat bg-center bg-cover rounded-[4px] relative"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="bg-[#203656] h-[500px] rounded-[4px] opacity-60"></div>
            <div className="absolute top-10 left-0 right-0 p-10">
              <div className="w-full sm:w-full md:w-full lg:w-6/12 text-center sm:text-center md:text-center lg:text-center">
                <h1 className="text-[#fff] text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold">
                  Welcome to EducationToday,
                  <br /> a Bloging page.
                </h1>
                <p className="text-[#fff] mt-8 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">
                  Include popular icons in your React projects easily with
                  react-icons, which utilizes ES6 imports that allows you to
                  include only the icons that your project is using.
                </p>
                <div className="mt-8 flex justify-center gap-x-10">
                  <button className="border-2 border-[#fff] hover:border-[#418160] p-3 font-semibold bg-[#fff] text-[#418160] hover:bg-[#418160] hover:text-[#fff] rounded-[4px]">
                    Learn More
                  </button>
                  <button className="border-2 border-[#fff] hover:border-[#418160] p-3 font-semibold bg-[#fff] text-[#418160] hover:bg-[#418160] hover:text-[#fff] rounded-[4px]">
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div>
            <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold">
              Featured for members
            </h1>
            <div className="flex justify-center items-center">
              <div className="w-2/12 border-[1.5px] border-[#000] mt-4"></div>
              <div className="w-10/12 border-[1px] border-gray mt-4"></div>
            </div>
          </div>
          <div className="">
            <div className="lg:flex gap-x-10">
              <div className="w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10">
                  {featureds.map((featured) => (
                    <PortraitCard key={featured.id} {...featured} />
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-full md:w-full lg:w-4/12 xl:w-4/12 mt-10 sm:mt-10 md:mt-10 lg:mt-0">
                <div className="flex flex-col gap-y-8 mt-10">
                  {sideFeatureds.map((sideFeatured) => (
                    <SLandscapeCard key={sideFeatured.id} {...sideFeatured} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <SponsoredAd />
          <Carousel images={images} />
          <SponsoredAd />
        </div>
      </section>
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
                    {latests.map((latest) => (
                      <PortraitCard key={latest.id} {...latest} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-4/12 xl:w-4/12 mt-10 sm:mt-10 md:mt-10 lg:mt-0">
            <div>
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold">
                Popular Posts
              </h1>
              <div className="flex justify-center items-center">
                <div className="w-2/12 border-[1.5px] border-[#000] mt-4"></div>
                <div className="w-10/12 border-[1px] border-gray mt-4"></div>
              </div>
            </div>
            <div className="flex flex-col gap-y-8 mt-10">
              {populars.map((popular) => (
                <SLandscapeCard key={popular.id} {...popular} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="lg:flex gap-x-10 px-[2rem] sm:px-[4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem]">
          <div className="w-full sm:w-full md:w-full lg:w-8/12 xl:w-8/12 ">
            <div>
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold">
                Trending Posts
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
                    {trendings.map((trending) => (
                      <PortraitCard key={trending.id} {...trending} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-4/12 xl:w-4/12 mt-10 sm:mt-10 md:mt-10 lg:mt-0">
            <div>
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold">
                Explore Topics
              </h1>
              <div className="flex justify-center items-center">
                <div className="w-2/12 border-[1.5px] border-[#000] mt-4"></div>
                <div className="w-10/12 border-[1px] border-gray mt-4"></div>
              </div>
            </div>
            <TopicsLists />
            <Info />
          </div>
        </div>
      </section>
      <TopValues />
    </>
  );
};

export default Home;
