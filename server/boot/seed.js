module.exports = function (app) {

  // //insert/seed sample cars
  // app.dataSources.db.automigrate("Car",function (err) {
  //   var cars=[{"paletNum": 1234,"brand": "TOYOTA","imageUrl":"/api/containers/avatars/download/default_car.jpg"},
  //             {"paletNum": 3254,"brand": "HILUX","imageUrl":"/api/containers/avatars/download/default_car.jpg"},
  //             {"paletNum": 2234,"brand": "BMW","imageUrl":"/api/containers/avatars/download/default_car.jpg"} ];
  //   var Car=app.models.Car;
  //   Car.create(cars,function (err,data) {
  //     if(err) throw err;
  //     // console.log("Models Created: \n"+ data);
  //   })
  //
  // });

  //insert/seed sample customers
  app.dataSources.db.automigrate("Customer",function (err) {
    var customers=[{"username": "king","password":"123456","email": "king@gmail.com" },
              {"username": "kebde","password":"123456","email": "kebede@gmail.com"},
              {"username": "prince","password":"123456","email": "prince@gmail.com"}, ];
    var Customer=app.models.Customer;
    Customer.create(customers,function (err,data) {
      if(err) throw err;
      // console.log("Models Created: \n"+ data);
    })

  })
};
