
$(document).ready( function(){
	show_random_text();
	show_random_texts();
	show_alert_by_urlparam();
});

function show_result(result_text){
	elem = $('#result'); 
	elem.text(result_text);
}

function show_random_text(){
	
	random_text = get_random_text();
	
	elem = $('#random_text'); 
	elem.text(random_text);
}

function show_random_texts(){
	
	var a = $('#random_texts').find('li')
	
	a.each(function(index, elem){
		$(elem).text(get_random_text());
	})
}

function get_random_text(){
	return Math.random().toString(36).slice(-8)
}
	
function show_alert_by_urlparam(){
	
	var url   = location.href;
	params    = url.split("?");

	if(params[1].indexOf('alert=True') >= 0){
		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();

		window.alert("現在は" + hour + "時" + min + "分" + sec + "秒です");
		
		show_result("アラートを表示しました");
	}
	else {
		show_result("アラートは表示しませんでした");
	}
}
