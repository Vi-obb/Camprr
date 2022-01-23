const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camprr', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Camprr is live');
});

const sample = array => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCity = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const newCamp = new campground({
            location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/155011",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, inventore porro. Voluptatem nobis magni obcaecati provident iste repudiandae.",
            price: price
        })
        await newCamp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close()
});