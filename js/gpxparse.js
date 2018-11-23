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

  // $("#dvContent").append("<ul></ul>");
  $.ajax({
    type: "GET",
    url: "/assets/Lugano.gpx",
    dataType: "xml",
    success: function(xml){

    var times = [];
    // var heartRates = [];
    var elevations = [];
    var points = [];
    // var cadences = [];
    $(xml).find('trk').each(function(){
      console.log("Finding name...");
      var name = $(this).find('name').text();
      var type = $(this).find('type').text();
      // points = $(this).find('trkpt').text();
      $('#filename').text(name);
    });

    // var heartrates = jQuery.makeArray();
    var numTrkpts = 0;
    var heartRateSum = 0;
    var cadSum = 0;
    var maxHR = 0;
    var minHR = 0;
    console.log("Aquiring Stats...");
    $(xml).find('trkpt').each(function(){
      times.push($(this).find('time').text());
      var hr = $(this).find('ns3\\:hr').text();

      if(parseInt(hr) > maxHR){
         maxHR = parseInt(hr);
      }

      if((parseInt(hr) < minHR) || minHR == 0){
         minHR = parseInt(hr);
      }
      heartRateSum += parseInt(hr);
      elevations.push($(this).find('ele').text());
      cadSum += parseInt($(this).find('ns3\\:cad').text());
      // console.log("HeartRate: " + heartrate);
      numTrkpts++;
    });
    var startTime = new Date(times[0]);
    var endTime = new Date(times[numTrkpts-1]);
    var res = Math.abs(endTime - startTime) / 1000;
    var hours = Math.floor(res / 3600) % 24;
    var minutes = Math.floor(res / 60) % 60;
    var seconds = res % 60;

    var year = startTime[0]+startTime[1]+startTime[2]+startTime[3];
    var month = startTime[5]+startTime[6];
    var day = startTime[8]+startTime[9];
    // var hours = parseInt(endTime[11]+endTime[12]) - parseInt(startTime[11]+startTime[12]);
    // var mins = parseInt(endTime[14]+endTime[15]) - parseInt(startTime[14]+startTime[15]);
    console.log("Min HR: " + minHR);
    console.log("Trkpts: " + numTrkpts);
    // console.log("Elevations: " + elevations);
    console.log("Start: " + startTime);
    console.log("End: " + endTime);
    console.log("Hours: " + hours);
    console.log("Minutes: " + minutes);
    console.log("Seconds: " + seconds);
    // console.log(hours);
    var avgHeartRate = heartRateSum / numTrkpts;
    var avgCad = cadSum / numTrkpts;
    console.log("Avg HeartRates: " + Math.round(avgHeartRate));
    console.log("Avg Cad: " + Math.round(avgCad));
    console.log("Points: " +points);
    $('#avgHR').text(Math.round(avgHeartRate) + "BPM");
    $('#avgCad').text(Math.round(avgCad) + "SPM");
    $('#maxHr').text("Max Heartrate: " + maxHR + "BPM");
    $('#minHr').text("Min Heartrate: " + minHR + "BPM");
    $('#tt').text("Time Taken: " + hours + " hours " + minutes + " minutes and " + seconds + " seconds");

  },
  error: function() {
    alert("An error occurred while processing XML file.");
  }
  });

});
