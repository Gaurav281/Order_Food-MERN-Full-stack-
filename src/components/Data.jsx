/* eslint-disable react/prop-types */
import "../css/card.css";

const Data = ({ items }) => {
  // Check if items is undefined or not an array
  if (!items || !Array.isArray(items)) {
    return <div>No items to display</div>;
  }

  return (
    <>
      {items.map((curElem) => {
        const {
          category,
          description,
          img,
          name,
          options = [],
          price,
          _id,
        } = curElem;
        return (
          <div key={_id} className="card-data-wrapper">
            <div className="image_container">
              <img className="image" src={img} alt={name} />
            </div>
            <div className="title">
              <span>
                {name} - {category}
              </span>
            </div>
            <div className="description">{description}</div>
            <div className="item-details">
              <select className="item-count">
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="item-type">
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="action">
              <div className="price">
                <span>₹{price}</span>
              </div>
              <button className="cart-button">
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Data;
