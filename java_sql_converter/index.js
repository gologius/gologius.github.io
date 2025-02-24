
const DEFAULT_JAVA_VAR_NAME  = "sb";

//=============================================================================
//データ取得
function get_src_sql_text(){
    let e = document.querySelector("#src_sql_text");
    return e.value;
}

function get_src_java_text(){
    let e = document.querySelector("#src_java_text");
    return e.value;
}

//java変数名取得
function get_java_var_name() {
    let e = document.querySelector("#java_var_name");
    return e.value;
}

//=============================================================================
//文字列入力時の処理

function update_java_var_name() {
    //変数欄が更新されたら、結果を再更新する
    update_dst_java();
    update_dst_sql();
}

function update_dst_java() {
    const src_text = get_src_sql_text();

    //変換結果のセット
    let elem =  document.querySelector("#dst_java_text");
    elem.value = convert_sql_to_java(src_text);
}

function update_dst_sql() {
    const src_text = get_src_java_text();

    //変換結果のセット
    let elem =  document.querySelector("#dst_sql_text");
    elem.value = convert_java_to_sql(src_text);
}

//=============================================================================
//変換

function convert_sql_to_java(src, padding_space_num=30) {
    if (src.length == 0) {
        return "";
    }

    let src_work = src;
    let var_name = get_java_var_name();

    //怪しい文字は置換する
    src_work = src_work.replaceAll("\t", "    "); //タブはスペースに置換する

    //入力テキストを、改行単位のリストに変換する
    src_work = src_work.replaceAll("\r\n", "\n");
    src_work = src_work.replaceAll("\r", "\n");
    let rows = src_work.split("\n");

    //実際の結合処理
    let dst_text = "";
    dst_text += `StringBuffer ${var_name} = new StringBuffer();\n`; //変数宣言
    for(let text of rows) {
        if (text == "") {
            continue;
        }
        
        dst_text += `${var_name}.append("${text.trimEnd()} ");\n`; //末尾にスペースを入れるのがポイント
    }
    return dst_text;
}

function convert_java_to_sql(src) {
    if (src.length == 0) {
        return "";
    }

    let src_work = src;
    let var_name = get_java_var_name();

    src_work = src_work.replaceAll(`StringBuffer ${var_name} = new StringBuffer();`, ""); //変数宣言箇所の削除
    src_work = src_work.replaceAll(`${var_name}.append("`, ""); //append部分の削除
    src_work = src_work.replaceAll(` ");`, ""); //append末尾部分の削除

    return src_work;
}


//=============================================================================
//ボタン押下時の処理

function clear_src_sql_text() {
    let e = document.querySelector("#src_sql_text");
    e.value = "";
    update_dst_java();
}

function clear_src_java_text() {
    let e = document.querySelector("#src_java_text");
    e.value = "";
    update_dst_sql();
}

function copy_dst_java_text(){
    let elem =  document.querySelector("#dst_java_text");
    navigator.clipboard.writeText(elem.value);
}

function copy_dst_sql_text(){
    let elem =  document.querySelector("#dst_sql_text");
    navigator.clipboard.writeText(elem.value);
}

//初期化
function init() {
    //初期値セット
    document.querySelector("#java_var_name").value = DEFAULT_JAVA_VAR_NAME;

    //入力欄のクリア
    clear_src_sql_text(); 
    clear_src_java_text(); 
}
init();
