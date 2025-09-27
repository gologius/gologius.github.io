
function init(){
	clear_src();
}

//======================================================================

//汎用チェック
function check_common() {

	let errtext = "";

	let tsv_text = document.querySelector("#src_text").value;	
	if (tsv_text === "") {
		errtext += "※TSV文字が空です<br>";	
	}

	let table_name = document.querySelector("#table_name").value;
	if (table_name === "") {
		errtext += "※テーブル名が空です<br>";	
	}

	let mode = document.querySelector("#mode").value;
	if(mode !== "INSERT" && mode !== "UPDATE") {
		errtext += "※モードが選択されていません<br>";	
	}

	if (errtext !== "") {
		show_toast("エラーが発生しました", errtext);
		return false;
	}

	return true;
}

//======================================================================

//ヘッダーサンプルを表で表示
function read_header() {

	//共通チェック
	if (check_common() == false) {
		return; //なにもしない
	}

	let html = "";
	html += `<tr>`;
	html += `<th>ヘッダー</th>`;
    
	//header部解析
	let tsv_text = document.querySelector("#src_text").value;	
	tsv_text = tsv_text.split('\r').join('');  //改行コード置換
	let rows = tsv_text.split('\n'); 
	let headers = rows[0].split("\t");
	for (let i = 0; i < headers.length; i++) {                
		html += `<td>${headers[i]}</td>`;
    } //for  

	html += `</tr>`;

	html += `<tr>`;
	html += `<th>ｸｫｰﾄ囲みしない</th>`;

	//クォート設定行の追加
	for (let i = 0; i < headers.length; i++) { 
		
		html += `<td><input type="checkbox" id="nonquot_${i}" value="1"></td>`;
    } //for  

	html += `</tr>`;

	html += `<tr>`;
	html += `<th>Where文として使う</th>`;

	//WHERE設定行の追加
	for (let i = 0; i < headers.length; i++) { 
		
		html += `<td><input type="checkbox" id="usewhere_${i}" value="1"></td>`;
    } //for  

	html += `</tr>`;


	//html反映
	let elem = document.querySelector("#header_sample");
	elem.innerHTML = ""; //初期化
	elem.insertAdjacentHTML("beforeend", html);	
}

//======================================================================

//SQL生成
function make_sql() {

	//共通チェック
	if (check_common() == false) {
		return; //なにもしない
	}

	//テキスト取得
	let tsv_text = document.querySelector("#src_text").value;	
	tsv_text = tsv_text.split('\r').join('');  //改行コード置換
	let table_name = document.querySelector("#table_name").value;
	let mode = document.querySelector("#mode").value;

	if (mode === "INSERT") {
		update_sql_insert(table_name, tsv_text); //SQL作成
	}
	else if (mode === "UPDATE"){
		update_sql_update(table_name, tsv_text); //SQL作成
	}
}

//INSERT用のSQLを生成～更新する
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
		if (cols.length == 0  || (cols.length==1 && cols[0]==="")){
            continue; //空行は無視
        }

		for (let j=0; j < cols.length; j++) {
			
			//設定に応じてクォート囲みするか判断
			if (get_col_setting("#nonquot_"+j)===true) {
				sql_tmp += `${cols[j]}`;
			}
			else {
				sql_tmp += `'${cols[j]}'`;
			}
		
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

//UPDATE用のSQLを生成～更新する
function update_sql_update(table_name, tsv_text) {
	
	//分解
	let rows = tsv_text.split('\n');

	//SQL前半部の作成
	let sql1 = "";
	sql1 += `UPDATE ${table_name} SET `;		

	//SQL後半部の作成
	let headers = rows[0].split("\t");
	let sql2 = "";

	for (let i = 1; i < rows.length; i++) {
        
		sql_tmp = "";

        let cols = rows[i].split("\t");
		if (cols.length == 0 || (cols.length==1 && cols[0]==="")){
            continue; //空行は無視
        }
		
		//set部作成
		let firstFlg = true;
		for (let j=0; j < cols.length; j++) {

			if (get_col_setting("#usewhere_"+j)===true) {
				continue; //where文で利用する列のため無視
			} 

			//初回ループか否かで、文字列結合するか否かを制御する
			if (firstFlg === true) {
				firstFlg = false;
			}
			else {
				sql_tmp += ", ";
			}

			//設定に応じてクォート囲みするか判断
			if (get_col_setting("#nonquot_"+j)===true) {
				sql_tmp += `${headers[j]} = ${cols[j]}`;
			}
			else {
				sql_tmp += `${headers[j]} = '${cols[j]}'`;	
			}
		} 

		sql_tmp += " WHERE "

		//where部作成
		firstFlg = true;
		for (let j=0; j < cols.length; j++) {

			if (get_col_setting("#usewhere_"+j)===false) {
				continue; //where文では使用しない列のため無視
			} 

			//初回ループか否かで、文字列結合するか否かを制御する
			if (firstFlg === true) {
				firstFlg = false;
			}
			else {
				sql_tmp += " AND ";
			}

			//設定に応じてクォート囲みするか判断
			if (get_col_setting("#nonquot_"+j)===true) {
				sql_tmp += `${headers[j]} = ${cols[j]}`;
			}
			else {
				sql_tmp += `${headers[j]} = '${cols[j]}'`;	
			}		
		} 


		sql_tmp += "; \n";		
		sql2 += sql1 + sql_tmp;
	} //for  

	//DOM要素にセット
	document.querySelector("#dst_text").value = sql2;	
}

//======================================================================
//UI操作

function clear_src() {
    document.querySelector("#mode").value = "";
    document.querySelector("#table_name").value = "";
    document.querySelector("#src_text").value = "";
	document.querySelector("#header_sample").innerHTML = "";
    document.querySelector("#dst_text").value = "";
}

function copy_sql(){
    let dst_text_zenkaku_elem =  document.querySelector("#dst_text");
    dst_text_zenkaku_elem.select();
    document.execCommand("copy", ); /*非推奨だがhttp環境下ではこうするしかない*/
    //navigator.clipboard.writeText(dst_text_zenkaku_elem.value);

    show_toast("コピーしました",dst_text_zenkaku_elem.value.substring(0,20) + "...");
}

//======================================================================
//ユーティリティ

//列設定を取得する
//param: index=列番号
function get_col_setting(selector){
	try {
		let elem = document.querySelector(selector);
		if (elem === null || elem === undefined) {
			return false;
		}

		if (elem.checked === true) {
			return true;
		}
	}
	catch(e){
		console.error(e);
		return false;
	}

	return false;
}

//トースト表示
function show_toast(title, body){

    const toast_elem = document.querySelector('#liveToast');
    document.querySelector('#liveToast .me-auto').textContent = title;
    document.querySelector('#liveToast .toast-body').innerHTML = body;

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast_elem);
    toastBootstrap.show();
}

//======================================================================

init();