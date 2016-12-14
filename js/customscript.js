$(document).ready(function () {
	$.getJSON("getResources.php", success = function(data) 
	{
		var options = "";
		
		for(var i = 0; i < data.length; i++)
		{
			options += "<option value='" + data[i].toLowerCase() + "'>" + data[i] + "</option>";
		}
		
		$("#slctname").append(options);
		
	});
	
	//handles signup form
	//$("#submitSignUp").click(funtion
	
	
	//handles contact page google map
	function myMap() {
  		var myCenter = new google.maps.LatLng(51.508742,-0.120850);
  		var mapCanvas = document.getElementById("map");
  		var mapOptions = {center: myCenter, zoom: 5};
  		var map = new google.maps.Map(mapCanvas, mapOptions);
  		var marker = new google.maps.Marker({position:myCenter});
  		marker.setMap(map);
	};
	
	//Handles Firebase
	var database = firebase.database();
	
	function submitSignUp(firstname, lastname, email) {
  		firebase.database().ref('users/' + user2).set({
    	first name: firstname,
    	last name: lastname,
    	email: email,
  		});
	}
	
	//Handles menu drop down
    $('#dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
    
    $('.dropdown-toggle').dropdown();
	
	 var navListItems = $('div.setup-panel div a'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
              $item = $(this);

      if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
      }

      if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
  });

  $('div.setup-panel div a.btn-primary').trigger('click');
});