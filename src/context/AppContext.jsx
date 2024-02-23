const { createContext, useState, useEffect } = require("react");

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  // Constants for API configuration
  const API_KEY = "AIzaSyCYgDAPHqBrC20ob9WMWhCV5Vv8kSPLtkM";
  const BLOG_ID = "3226864875966992925";
  const MAX_RESULTS = 4;
  const FEATURED_RESULTS = 2;
  const SIDE_FEATURED_RESULTS = 3;
  const SIDE_POPULAR_RESULTS = 6;
  const LATEST_RESULTS = 10;

  // State for featured, latest, and trending posts
  const [featureds, setFeatureds] = useState([]);
  const [sideFeatureds, setSideFeatureds] = useState([]);
  const [latests, setLatests] = useState([]);
  const [populars, setPopular] = useState([]);
  const [trendings, setTrendings] = useState([]);
  const [categorys, setCategorys] = useState([]);
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
    fetchData(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=${LATEST_RESULTS}`,
      setCategorys,
      LATEST_RESULTS
    );
  }, []);

  const value = {
    featureds,
    setFeatureds,
    sideFeatureds,
    setSideFeatureds,
    latests,
    setLatests,
    populars,
    setPopular,
    trendings,
    setTrendings,
    loading,
    setLoading,
    categorys,
    setCategorys,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
