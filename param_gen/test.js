function generate_result() {
	var elm = document.getElementsByName("exe");
	var exe = elm[0].value;
	
	var elm = document.getElementsByName("newwindow");
	var newwindow = elm[0].value;

	var elm = document.getElementsByName("size");
	var size = elm[0].value;
	var elm = document.getElementsByName("size-w");
	var sizew = elm[0].value;
	var elm = document.getElementsByName("size-h");
	var sizeh = elm[0].value;

	var elm = document.getElementsByName("pos");
	var pos = elm[0].value;
	var elm = document.getElementsByName("pos-x");
	var posx = elm[0].value;
	var elm = document.getElementsByName("pos-y");
	var posy = elm[0].value;

	var elm = document.getElementsByName("appmode");
	var appmode = elm[0].value;

	var elm = document.getElementsByName("default-url");
	var defaulturl = elm[0].value;


	var elm = document.getElementsByName("result");
	elm[0].value = "\"" + exe + "\"" + " " 
	+ newwindow + " " 
	+ size + sizew +","+ sizeh + " "
	+ pos + posx +","+ posy + " "
	+ appmode + "" 
	+ "\"" + defaulturl + "\"";	
}
