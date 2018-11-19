function getAlert() {
    $('input[type="file"]').change(function(){
        alert("A file has been selected.");
    });
}

$(document).ready(function(){
    getAlert();
});