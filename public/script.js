$(document).ready(function(){
  console.log('JQ');

$('#registerOwner').on('click', ownerName);


});// end on ready

var ownerName = function(){
  var objectToSend = {
    name: $('#firstName').val() + ' ' + $('#lastName').val()
  };
$.ajax({
  type: 'POST',
  url: '/owner',
  data: objectToSend,
  success: function(response){
    console.log('woof:', response);
  }//end success
});//end ajax post

};
