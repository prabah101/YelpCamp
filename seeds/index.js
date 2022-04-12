const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 20
        const camp = new Campground({
            author: '6249a807497857d700789820',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique non quisquam suscipit ex facilis, est modi, veniam temporibus nemo aliquam ratione consectetur optio minima voluptas quis! Voluptates debitis ea perferendis magni dolorum labore est. Esse eaque deleniti alias, delectus porro rem nihil a at nostrum? Obcaecati in mollitia eaque fugiat.',
            price: price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/dqa25yxub/image/upload/v1649249586/YelpCamp/z3ofvjrxcmvb1plmklnu.jpg',
                  filename: 'YelpCamp/z3ofvjrxcmvb1plmklnu'
                },
                {
                  url: 'https://res.cloudinary.com/dqa25yxub/image/upload/v1649249590/YelpCamp/sq2iqr9dzn9nfcp09sqq.jpg',
                  filename: 'YelpCamp/sq2iqr9dzn9nfcp09sqq'
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})