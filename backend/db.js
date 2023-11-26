const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://goFood:murtazamaf@cluster0.dwvctun.mongodb.net/gofoodmern?retryWrites=true&w=majority';

// const mongoURI ='mongodb://goFood:murtazamaf@ac-nlwr41p-shard-00-00.dwvctun.mongodb.net:27017,ac-nlwr41p-shard-00-01.dwvctun.mongodb.net:27017,ac-nlwr41p-shard-00-02.dwvctun.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-514ygd-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoURI ='mongodb://goFood:murtazamaf@ac-nlwr41p-shard-00-00.dwvctun.mongodb.net:27017,ac-nlwr41p-shard-00-01.dwvctun.mongodb.net:27017,ac-nlwr41p-shard-00-02.dwvctun.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-514ygd-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async () => {
  try {
    // connect mongoose to mondb database
      await mongoose.connect(mongoURI, { useNewUrlParser: true});

      console.log('Connected to MongoDB');

      //fetch data from mongodb
      fetchData();
  } catch (error) {
      console.error('Error connecting to MongoDB: ', error);
  }
};

async function fetchData() {
  try {
    //save collection in fetched_data
      const fetched_data = await mongoose.connection.db.collection("food_items");
      //find data from fetched_data and convert to array and save in data
      const data = await fetched_data.find({}).toArray(async function(err,data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function (err,catData){
        if(err) console.log(err);
        else {
          global.food_items = data;
          global.foodCategory = catData;

        }
      })
      });
      // global.food_items = data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}



module.exports = mongoDB;