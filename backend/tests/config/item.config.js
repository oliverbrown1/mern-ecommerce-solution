const mg = require("mongoose");

const testCategory = "test_category"
const testCategoryItems = [
    {
        title: "test1",
        price: 10,
        category: testCategory,
        sku: "1",
        thumbnail: "https://example.com/thumbnail.jpg",
        rating : 1
    },
    {
        title: "test2",
        price: 20,
        category: testCategory,
        sku: "2",
        thumbnail: "https://example.com/thumbnail.jpg",
        rating : 2
    },
    {
        title: "test3",
        price: 30,
        category: testCategory,
        sku: "3",
        thumbnail: "https://example.com/thumbnail.jpg",
        rating : 3
    }
] 

const userTestItem = {
    title: "user test item",
    price: 12.99,
    description: "A test beauty product",
    thumbnail: "https://example.com/thumbnail.jpg",
    images: [
        "https://example.com/image-1.jpg",
        "https://example.com/image-2.jpg"
    ],
    category: "beauty",
    stock: 10,
    rating: 4.5,
    brand: "test",
    sku: "usertestitem",
    tags: ["beauty", "makeup"],
    reviews: [
        {
            rating: 5,
            comment: "Great product",
            date: new Date("2026-01-01"),
            reviewerName: "Test User",
            reviewerEmail: "reviewer@example.com"
        }
    ]
};

const cartTestItem = {
    title: "cart test item",
    price: 12.99,
    description: "A test beauty product",
    thumbnail: "https://example.com/thumbnail.jpg",
    images: [
        "https://example.com/image-1.jpg",
        "https://example.com/image-2.jpg"
    ],
    category: "beauty",
    stock: 10,
    rating: 4.5,
    brand: "test",
    sku: "carttestitem",
    tags: ["beauty", "makeup"],
    reviews: [
        {
            rating: 5,
            comment: "Great product",
            date: new Date("2026-01-01"),
            reviewerName: "Test User",
            reviewerEmail: "reviewer@example.com"
        }
    ]
};

const missingItemId = new mg.Types.ObjectId().toString();

module.exports = {testCategory, testCategoryItems, userTestItem, cartTestItem, missingItemId}