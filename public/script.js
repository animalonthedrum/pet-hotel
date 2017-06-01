$(document).ready(function() {
  console.log('JQ');

  $('#registerOwner').on('click', ownerName);
  $('#addPet').on('click', petInfo);
  dropDown();
  tableTime();

}); // end on ready

var ownerName = function() {
  var objectToSend = {
    name: $('#firstName').val() + ' ' + $('#lastName').val()
  };
  $.ajax({
    type: 'POST',
    url: '/owner',
    data: objectToSend,
    success: function(response) {
      console.log('woof:', response);
    } //end success
  }); //end ajax post
  dropDown();
}; // end owner function

var dropDown = function() {
  $.ajax({
    type: 'GET',
    url: '/owner',
    success: function(response) {
      console.log('meow', response);
      $('#owners').empty();
      for (var i = 0; i < response.length; i++) {
        $('#owners').append('<option>' + response[i].owner + '</option>');
      }
    }
  }); //


};

var petInfo = function() {
  var petToSend = {
    name: $('#petName').val(),
    color: $('#color').val(),
    breed: $('#breed').val(),
    owner: $('#owners').val()
  }; // end petToSend
  console.log(petToSend);
  $.ajax({
    type: 'POST',
    url: '/pet',
    data: petToSend,
    success: function(response) {
      console.log('ribbet:', response);
    } //end success
  }); //end ajax post
};

var tableTime = function() {
  $.ajax({
    type: 'GET',
    url: '/owner',
    success: function(response) {
      console.log('meow', response);
      $('#owners').empty();


      for (var i = 0; i < response.length; i++) {
        var tableRow = '<tr>';
        tableRow += '<td>' + response[i].owner + '</td>';
        tableRow += '<td>' + response[i].pet + '</td>';
        tableRow += '<td>' + response[i].breed + '</td>';
        tableRow += '<td>' + response[i].color + '</td>';
        tableRow += '<td><button>GO</button></td>';
        tableRow += '<td><button>GO</button></td>';
        tableRow += '<td><button>OUT</button></td>';
        tableRow += '</tr>';
        $('#myTable tr:last').after(tableRow);
      }
    }
  }); //
}; //end tabelTime
