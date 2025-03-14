const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");

const properties = [
  {
    title: "Modern Apartment in Downtown",
    type: "Apartment",
    description: "A beautiful apartment in the heart of the city.",
    price: 250000,
    location: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    squareFeet: 1200,
    yearBuilt: 2015
  },
  {
    title: "Spacious Suburban House",
    type: "House",
    description: "A cozy house in a quiet neighborhood.",
    price: 450000,
    location: {
      address: "456 Oak Dr",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    squareFeet: 2000,
    yearBuilt: 2010
  }
];

describe("Property Controller", () => {
  beforeEach(async () => {
    await Property.deleteMany({});
    await Property.insertMany(properties);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/properties
  it("should return all properties as JSON when GET /api/properties is called", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  // Test POST /api/properties
  it("should create a new property when POST /api/properties is called", async () => {
    const newProperty = {
      title: "Luxury Beachfront Villa",
      type: "Villa",
      description: "An exclusive villa with ocean views.",
      price: 1000000,
      location: {
        address: "789 Ocean Blvd",
        city: "Miami",
        state: "FL",
        zipCode: "33139"
      },
      squareFeet: 3500,
      yearBuilt: 2020
    };

    await api
      .post("/api/properties")
      .send(newProperty)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const propertiesAfterPost = await Property.find({});
    expect(propertiesAfterPost).toHaveLength(properties.length + 1);
    const propertyTitles = propertiesAfterPost.map((property) => property.title);
    expect(propertyTitles).toContain(newProperty.title);
  });
});