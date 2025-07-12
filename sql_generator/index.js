
function init(){
	update_sql();
	update_mode();
}

function update_sql() {

	//テキスト取得
	let tsv_text = document.querySelector("#src_text").value;	
	tsv_text = tsv_text.split('\r').join('');  //改行コード置換
	if (tsv_text === "") {
		document.querySelector("#dst_text").value = "※TSV文字が空です";	
		return;		
	}

	let table_name = document.querySelector("#table_name").value;
	if (table_name === "") {
		document.querySelector("#dst_text").value = "※テーブル名が空です";	
		return;
	}

	let mode = document.querySelector("#mode").value;

	if (mode === "INSERT") {
		update_sql_insert(table_name, tsv_text); //SQL作成
	}
	else if (mode === "UPDATE"){
		update_sql_update(table_name, tsv_text); //SQL作成
	}
	else {
		document.querySelector("#dst_text").value = "※モードが選択されていません";	
		return; //ここで終了
	}
}

function update_sql_insert(table_name, tsv_text) {
	
	//分解
	let rows = tsv_text.split('\n');

	//SQL先頭作成
	let sql1 = "";
	sql1 += `INSERT INTO ${table_name} ( `;

	//header部解析
	let headers = rows[0].split("\t");
	for (let i = 0; i < headers.length; i++) {                
		sql1 += `${headers[i]}`;
		
		if (i != headers.length-1) {
			sql1 += ", ";
		}

    } //for  

	sql1 += " ) VALUES ( ";

	//body部解析 		
	let sql2 = "";
	for (let i = 1; i < rows.length; i++) {
        
		sql_tmp = "";

        let cols = rows[i].split("\t");
		if (cols.length == 0){
            continue; //空行は無視
        }
		
		for (let j=0; j < cols.length; j++) {
			sql_tmp += `'${cols[j]}'`;
		
			if (j != cols.length-1) {
				sql_tmp += ", ";
			}
		} 
		sql_tmp += " ); \n";
		
		sql2 += sql1 + sql_tmp;
	} //for  


	//DOM要素にセット
	document.querySelector("#dst_text").value = sql2;	
}

function update_sql_update(table_name, tsv_text) {
	
	//分解
	let rows = tsv_text.split('\n');

	//SQL前半部の作成
	let sql1 = "";
	sql1 += `UPDATE ${table_name} SET `;		

	//SQL後半部の作成
	let headers = rows[0].split("\t");
	let sql2 = "";
	let col_where_from = 0;
	let col_where_to = 0;

	col_where_from = parseInt(document.querySelector("#col_where_from").value);
	col_where_to = parseInt(document.querySelector("#col_where_to").value);
	if (Number.isNaN(col_where_from) || Number.isNaN(col_where_to)) {
		document.querySelector("#dst_text").value = "※列範囲が不正です";	
		return; //ここで終了
	}

	console.log(col_where_from, col_where_to);

	for (let i = 1; i < rows.length; i++) {
        
		sql_tmp = "";

        let cols = rows[i].split("\t");
		if (cols.length == 0){
            continue; //空行は無視
        }
		
		//set部作成
		for (let j=0; j < cols.length; j++) {

			if (j <= col_where_from && col_where_to <= j ) {
				continue; //where文で利用する列のため無視
			} 

			sql_tmp += `${headers[j]} = '${cols[j]}'`;
		
			if (j != cols.length-1) {
				sql_tmp += ", ";
			}
		} 

		sql_tmp += " WHERE "

		//where部作成
		for (let j=col_where_from; j <= col_where_to; j++) {

			sql_tmp += `${headers[j]} = '${cols[j]}'`;
		
			if (j != col_where_to) {
				sql_tmp += " AND ";
			}
		} 


		sql_tmp += "; \n";		
		sql2 += sql1 + sql_tmp;
	} //for  

	//DOM要素にセット
	document.querySelector("#dst_text").value = sql2;	
}

//======================================================================

function clear_src() {
    document.querySelector("#mode").value = "";
    document.querySelector("#table_name").value = "";
    document.querySelector("#src_text").value = "";
    update_sql();
}

function update_mode(){
	let mode = document.querySelector("#mode").value;
	
	if (mode === "UPDATE") {
		document.querySelector("#row_update").style.display = "block";
	}
	else {
		document.querySelector("#row_update").style.display = "none";		
	}

	update_sql();
}

function copy_sql(){
    let dst_text_zenkaku_elem =  document.querySelector("#dst_text");
    dst_text_zenkaku_elem.select();
    document.execCommand("copy", ); /*非推奨だがhttp環境下ではこうするしかない*/
    //navigator.clipboard.writeText(dst_text_zenkaku_elem.value);

    show_toast("コピーしました",dst_text_zenkaku_elem.value.substring(0,20) + "...");
}

function show_toast(title, body){

    const toast_elem = document.querySelector('#liveToast');
    document.querySelector('#liveToast .me-auto').textContent = title;
    document.querySelector('#liveToast .toast-body').textContent = body;

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast_elem);
    toastBootstrap.show();
}

//======================================================================

init();