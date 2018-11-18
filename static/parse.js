function parseXML(event, input, text) {
    var readXml=null;
    event.preventDefault();
    var selectedFile = document.getElementById(input).files[0];
	 console.log("File Selected");
    console.log(selectedFile);
    var reader = new FileReader();
    reader.onload = parseCall(readXml, event, input, text);
	 reader.readAsText(selectedFile);
}

function parseCall(readXml, e, input, text){
	 console.log("in function");
	 readXml=e.target.result;
	 console.log("readXML");
	 console.log(readXml);
	 var parser = new DOMParser();
	 var doc = parser.parseFromString(readXml, "application/xml");
	 console.log(doc);
	 console.log("text");
	 document.getElementById(text).innerHTML =
		 doc.getElementsByTagName("name")[0].childNodes[0].nodeValue;

	  L.marker([doc.getElementsByTagName("trkpt")[0].childNodes[1].nodeValue,
		  doc.getElementsByTagName("trkpt")[0].childNodes[1].nodeValue]).addTo(map).bindPopup('Location 2').openPopup();
}
