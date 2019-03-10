
$(document).ready( function(){
	show_random_text();
});

function show_result(result_text){
	elem = $('#result'); 
	elem.text(result_text);
}

function show_random_text(){
	
	random_text = Math.random().toString(36).slice(-8);
	
	elem = $('#random_text'); 
	elem.text(random_text);
}
