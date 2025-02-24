
//=============================================================================
//データ取得
function get_src_json_text(){
    let e = document.querySelector("#src_json_text");
    return e.value;
}

function get_selected_indent() {
    let e = document.querySelector("#indent");
    return e.value;
}

//=============================================================================
//文字列入力時の処理

function convert_json(mode) {

    //元文字列の取得
    const src_text = get_src_json_text();

    //変換開始
    let dst_text = "";
    let errmsg = "";
    try {
        if (src_text !== "") {
            let obj = JSON.parse(src_text);
            
            if (mode == "indent") {
                dst_text = JSON.stringify(obj, null,"\t");
            }
            else if (mode == "oneline") {
                dst_text = JSON.stringify(obj);
            }
        }
    }
    catch(e) {
        errmsg = "JSONパース中にエラーが発生しました";
        console.log(e);
    }

    //変換結果のセット
    document.querySelector("#dst_json_text").value = dst_text;
    document.querySelector("#msg").textContent = errmsg;
    if (errmsg == "") {
        document.querySelector("#msg").style.setProperty("display","none");
    }
    else {
        document.querySelector("#msg").style.setProperty("display","block");        
    }
}

//=============================================================================
//ボタン押下時の処理

function clear_src_json_text() {
    let e = document.querySelector("#src_json_text");
    e.value = "";
    convert_json();
}

function copy_dst_json_text(){
    let elem =  document.querySelector("#dst_json_text");
    navigator.clipboard.writeText(elem.value);
}

//初期化
function init() {

    //入力欄のクリア
    clear_src_json_text(); 
}
init();
