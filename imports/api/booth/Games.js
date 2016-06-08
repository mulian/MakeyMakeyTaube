export default
class Game extends Mongo.Collection {
  constructor() {
    super('games');
  }
  addGame(obj) {
    var currentObj = this.findOne({path:obj.path});
    if(currentObj==undefined) {
      this.insert(obj);
    } else {
      this.update({_id:currentObj._id},obj);
    }
  }
}
