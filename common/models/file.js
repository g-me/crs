var CONTAINERS_URL = '/api/containers/';
module.exports = function(File) {

  File.uploadFile = function (data,options,cb) {
    if(!options) options = {};
    console.log(data.req.params);
    data.req.params.container = 'avatars';
    File.app.models.Container.upload(data.req,data.result,options,function (err,fileObj) {
        if(err) {
          cb(err);
        } else {
          console.log(fileObj);
          var fileInfo = fileObj.files.myFile[0];
          console.log(fileInfo);
            File.create({
              name: fileInfo.name,
              type: fileInfo.type,
              container: fileInfo.container,
              url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
            },function (err,obj) {
              if (err !== null) {
                cb(err);
              } else {
                cb(null, obj);
              }
            });
        }
    });


  };

  File.remoteMethod(
    'uploadFile',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'data', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  );
};
