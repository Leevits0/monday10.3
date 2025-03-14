import PropertyListing from "./PropertyListing";

const PropertyListings = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyListing key={property._id || property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyListings;
