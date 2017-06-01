$(document).ready(function() {
  console.log('JQ');

  $('#registerOwner').on('click', ownerName);
  $('#addPet').on('click', petInfo);
  dropDown();
  tableTime();
  $('#myTable').on('click', '#update', function() {
    var id = $(this).data("id");
    console.log(id);
    updateInfo(id);
  });

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
        var tableRow = '<tr data-id="' + response[i].id + '">';
        tableRow += '<td data-id="' + response[i].id + '_owner"contenteditable = "true">' + response[i].owner + '</td>';
        tableRow += '<td data-id="' + response[i].id + '_pet"contenteditable = "true">' + response[i].pet + '</td>';
        tableRow += '<td data-id="' + response[i].id + '_breed"contenteditable = "true">' + response[i].breed + '</td>';
        tableRow += '<td data-id="' + response[i].id + '_color"contenteditable = "true">' + response[i].color + '</td>';
        tableRow += '<td><button data-id="' + response[i].id + '"id="update">GO</button></td>';
        tableRow += '<td><button id="delete">GO</button></td>';
        tableRow += '<td data-id="' + response[i].id + '_inout"><button id="check">OUT</button></td>';
        tableRow += '</tr>';
        $('#myTable tr:last').after(tableRow);
      }
    }
  }); //
}; //end tabelTime

var updateInfo = function(id) {
  var updateToSend = {
    name: $('a[data-item-id="' + id + '_pet"]').val(),
    color: $('a[data-item-id="' + id + '_color"]').val(),
    breed: $('a[data-item-id="' + id + '_breed"]').val(),
    owner: $('a[data-item-id="' + id + '_owner"]').val(),
    id: $('a[data-item-id="' + id + '"]').val()
  };
  $.ajax({
    type: 'PUT',
    url: '/pet/' + id + '',
    data: updateToSend,
    success: function(response) {
      console.log('ribbet:', response);
    } //end success
  }); //end ajax post
};
