'use strict';

module.exports = function(Review){
  Review.disableRemoteMethd("count", true);
  Review.disableRemoteMethd("exists", true);
  Review.disableRemoteMethd("findOne", true);
  Review.disableRemoteMethd("createChangeStream", true);
  Review.disableRemoteMethd("updateAll", true);
};
