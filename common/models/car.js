var CONTAINERS_URL = '/api/containers/';
var DEFAULT_CAR_AVATAR ='http://0.0.0.0:3000/api/containers/cars/download/default_car.jpg';
module.exports = function(Car) {

  // Car.beforeRemote('create', function (ctx, unused, next) {
  //   console.log(ctx.req.body);
  //   console.log('creating car');
  //   if(ctx.req.body.carImageData) { // if there is car image binary data
  //     console.log('there is image data ');
  //
  //     ctx.req.params.container = 'cars';
  //     Car.app.models.Container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
  //       if(err) {
  //         cb(err);
  //       } else {
  //         console.log(fileObj);
  //         var fileInfo = fileObj.files.carImageData[0];
  //         var imageData = { name: fileInfo.name, type: fileInfo.type,
  //                         container: fileInfo.container,
  //                         url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
  //         };
  //         File.create(imageData,function (err,obj) {
  //           if (err !== null) {
  //             cb(err);
  //           } else {
  //             ctx.req.body.imageUrl=imageData.url;
  //             cb(null, obj);
  //           }
  //         });
  //       }
  //     });
  //
  //   }
  //   else{
  //     console.log('setting default ');
  //
  //     ctx.req.body.imageUrl = DEFAULT_CAR_AVATAR;
  //   }
  //
  //   console.log("finally!");
  //   console.log(ctx.req.body);
  //
  //   next();
  // });

};
