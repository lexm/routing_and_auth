module.exports = (app) => {
  app.factory('movieSvc', function() {
    var service = {};

    function saveOldRecord(record, oldRecord) {
      if (!oldRecord) {
        oldRecord = record;
      }
      return oldRecord;
    }

    service.showEditFlip = function(record) {

      var oldRecord;
      if(record.showEdit === undefined) {
        oldRecord = saveOldRecord(record, oldRecord);
        record.showEdit = true;
      } else if (!record.showEdit) {
        record.showEdit = true;
      } else {
        record.showEdit = false;
      }
    };
    
    return service;
  });
};
