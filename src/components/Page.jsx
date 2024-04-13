import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Page() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/app-api/v1/photo-gallery-feed-page/page/${page}`
        );
        const newData = await response.json();

        setData((prevData) => [...prevData, ...newData.nodes]);
        if (page < 3) {
          setPage(page + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);


  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    } else {
      return title;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div>
      <div
        style={{
          border: "solid black 2px",
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "black",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0", color: "white" }}>
          Papography
        </h1>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={() => (page <= 3 ? setPage(page + 1) : null)}
        hasMore={true}
        scrollThreshold={0.1}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((node) => (
            <div
              key={node.node.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <img
                style={{
                  height: "200px",
                  width: "300px",
                  borderRadius: "30px",
                  marginRight: "20px",
                }}
                src={node.node.ImageStyle_thumbnail}
                alt={node.node.title}
              />
              <div>
                <div
                  style={{
                    maxWidth: "300px",
                    alignItems: "top",
                    marginBottom: "20px",
                    fontSize: "24px",
                    fontFamily: "fantasy",
                  }}
                >
                  {truncateTitle(node.node.title, 60)}
                </div>
                <div style={{ color: "gray" }}>
                  {formatTimestamp(node.node.last_update)} IST
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
