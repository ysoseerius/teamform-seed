
describe('Test firechat.js', function(){

  it ('test Firechat funtion', function(){
    var firebaseRef = {database:{app:{
      'room-messages':{},
      'room-metadata':{},
      'room-private-metadata':{},
      'moderators' :{},
      'suspensions' :{},
      'user-names-online':{}
    }}};
    firebaseRef.child = function(a){return a};
    Firechat(firebaseRef, null);
});


  it ('test noConflict function', function(){
    var value = Firechat.noConflict();
    expect(Firechat).toEqual(Firechat);

  });

  it ('test prototype.resumeSession', function(){
      Firechat.prototype.on();

  });

  });
