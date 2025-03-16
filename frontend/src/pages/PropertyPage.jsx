import { useState, useEffect } from "react";

const PropertyPage = ({ isAuthenticated }) => { // ✅ Accept isAuthenticated prop
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/properties")
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error("Error fetching properties:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    const response = await fetch(`http://localhost:4000/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
      }
    });

    if (response.ok) {
      setProperties(properties.filter(property => property._id !== id));
    } else {
      console.error("Failed to delete property");
    }
  };

  return (
    <div>
      <h2>Properties</h2>
      {properties.map(property => (
        <div key={property._id}>
          <h3>{property.title}</h3>
          <p>{property.location}</p>
          {isAuthenticated && (
            <>
              <button onClick={() => console.log("Edit", property._id)}>Edit</button>
              <button onClick={() => handleDelete(property._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyPage;
