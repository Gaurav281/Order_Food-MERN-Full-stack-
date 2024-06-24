import { useEffect, useState } from "react";
import Data from "../components/Data";
import Footer from "../components/Footer";
import Load from "../components/Load";
import Navbar from "../components/Navbar";
import "../css/slider.css";
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCategories, setFoodCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/foodData", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const [items, categories] = await res.json();
      setFoodItems(items);
      setFoodCategories(categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div style={{ height: "500px", width: "100%" }} className="slider">
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/600x400?food"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/600x400?burger"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/600x400?fruits"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="second-card">
        {foodCategories.length > 0 &&
          foodCategories.map((data) => (
            <div key={data._id}>
              {data.categorieName}
              <hr />
              <div className="second-main">
                {foodItems.length > 0 &&
                  foodItems
                    .filter(
                      (item) =>
                        item.category === data.categorieName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => (
                      <Load
                        key={filterItems._id}
                        foodItems={filterItems}
                        // foodName={filterItems.name}
                        // options={filterItems.options}
                        // imgSrc={filterItems.img}
                        // price={filterItems.price}
                        // description={filterItems.description}
                        // category={filterItems.category}
                        _id={filterItems._id}
                      />
                    ))}
              </div>
            </div>
          ))}
      </div>
      <div className="card-main">
        <Data items={foodItems} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
