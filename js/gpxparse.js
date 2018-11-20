function getAlert() {
    $('input[type="file"]').change(function(){
        alert("A file has been selected.");
        // event.preventDefault();
        //    var selectedFile = document.getElementById('fileinput').files[0];
        //    console.log(selectedFile);
        //    var reader = new FileReader();
        //    reader.onload = function(e) {
        //        var readXml=e.target.result;
        //        console.log(readXml);
        //        var parser = new DOMParser();
        //        var doc = parser.parseFromString(readXml, "application/xml");
        //        console.log(doc);
        //    }
        //    reader.readAsText(selectedFile);

    });

    $('#submit').click(function(){
      console.log("parsing");
      var selectedFile = document.getElementById('fileinput').files[0];
      xmlDoc = $.parseXML( selectedFile ),
       $xml = $( xmlDoc ),
       $name = $xml.find( "name" ).text();
       console.log(selectedFile);

      document.getElementById('filename').innerHTML = $name;
   })
}

$(document).ready(function(){
    // getAlert();

  $("#dvContent").append("<ul></ul>");
  $.ajax({
    type: "GET",
    url: "/assets/Lugano.gpx",
    dataType: "xml",
    success: function(xml){
    $(xml).find('trk').each(function(){
      var name = $(this).find('name').text();
      var type = $(this).find('type').text();
      var heartbeats = jQuery.makeArray();
      console.log(name);
      $('#filename').text(name);
    });
  },
  error: function() {
    alert("An error occurred while processing XML file.");
  }
  });

});
