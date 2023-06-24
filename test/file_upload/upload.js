const MAX_FILE_SIZE_MB = 500; 
const MAX_FILE_COUNT = 10;

/*===============================================================*/
//ファイル操作系

function upload_files(new_files) {
    
    //変数準備
    let sum_size = 0;
    let file_count = 0;
    let file_name_list = [];
    let work_transfer = new DataTransfer(); //通常の配列ではなく、datatransferでファイル管理する必要あり。

    //現時点でUPされているファイルを走査する → 配列に格納
    let now_files = document.getElementById("upload_files").files;
    for (var i = 0; i < now_files.length; i++) {
        var file = now_files[i];
        work_transfer.items.add(file);
        
        sum_size += file.size;
        file_count += 1;
        file_name_list.push(file.name);
    }

    //アップロード対象のファイル群を走査 → 配列に格納
    for (var i = 0; i < new_files.length; i++) {
        var file = new_files[i];
        work_transfer.items.add(file);
        
        sum_size += file.size;
        file_count += 1;
        file_name_list.push(file.name);
    }

    //対象ファイルの走査が完了して用済みのため、tmp_filesはリセットする
    let elem = document.getElementById("tmp_files");
    elem.files = new DataTransfer().files;

    //UPしてよいか判定
    let errflg = false;
    if (sum_size > MAX_FILE_SIZE_MB * 1048576){
        alert(`ファイルサイズの合計値は ${MAX_FILE_SIZE_MB}MB です`);
        errflg = true;
    }
    if (file_count > MAX_FILE_COUNT){
        alert(`ファイルをUPできる最大個数は ${MAX_FILE_COUNT}個 です`);
        errflg = true;
    }
    //重複を削除したSetを生成。ファイル名が重複していると、Setの要素数がファイル数よりも減るので、それを利用する
    let uniqueSet = new Set(file_name_list); 
    if (file_count != uniqueSet.size) {
        alert("同じファイル名が既に存在します");
        errflg = true;
    }
    
    //UPしても問題ないと判断できれば、実際にファイルアップロードする
    if (errflg == false) {
        document.getElementById("upload_files").files = work_transfer.files; 
    }

    //表示更新
    update_file_list_html();

    return;
}

function delete_file(file_id) {
    //datatransferの仕様上、直接要素を削除したり操作することができない。
    //よって、下記ような対応をしている

    let work_transfer = new DataTransfer(); 
    let elem = document.getElementById("upload_files");

    //現時点でUPされているファイルを走査する
    let now_files = elem.files;
    for (var i = 0; i < now_files.length; i++) {        
        if (file_id != i) {
            work_transfer.items.add(now_files[i]); //削除対象でなければリストに追加
        }
    }

    //ファイルリスト更新
    elem.files = work_transfer.files; 
    
    //表示更新
    update_file_list_html();
}

/*===============================================================*/
//HTML更新系

function dragArea_On() {
    elem = document.getElementById("dd_area");
    elem.classList.add("drop_area_on");
    elem.classList.remove("drop_area_off");
}

function dragArea_Off() {
    elem = document.getElementById("dd_area");
    elem.classList.remove("drop_area_on");
    elem.classList.add("drop_area_off");
}

function update_file_list_html() {

    let parent = document.getElementById("upload_files_list");

    //存在している要素を一旦すべて削除する
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    //現行ファイルの数だけ要素（行）を挿入
    let now_files = document.getElementById("upload_files").files;
    let file_count = 0;
    let sum_size_mb = 0;
    for (let i = 0; i < now_files.length; i++) {
        let file = now_files[i];
        let mb = Math.round(file.size / 1048576 * 10) / 10;
        file_count += 1;
        sum_size_mb += mb;

        let html = `
        <tr>
            <td >${file.name}</td>
            <td class="col_filesize">${mb} MB</td>
            <td class="col_button"><input type="button" value="削除" onclick="delete_file(${i}); "></td>
        </tr>
        `
        parent.insertAdjacentHTML('beforeend', html);
    }

    //CSS更新
    dragArea_Off();
}

/*===============================================================*/

function clickUpload() {
    document.getElementById("tmp_files").click();
}

//初期化
function init(){
    var dd_area = document.getElementById("dd_area");    
    dd_area.addEventListener("dragover", function(event){
        event.preventDefault(); //入れないとファイルを開くダイアログが表示されてしまう
        dragArea_On();
    });
    dd_area.addEventListener("dragleave", function(event){
        event.preventDefault(); //入れないとファイルを開くダイアログが表示されてしまう
        dragArea_Off();
    });
    dd_area.addEventListener("drop", function(event){
        event.preventDefault(); //入れないとファイルを開くダイアログが表示されてしまう
        let new_files = event.dataTransfer.files;   
        upload_files(new_files);       
    });

    var tmp_files = document.getElementById("tmp_files");
    tmp_files.addEventListener("change", function(event) {
        let success = upload_files(this.files);
            
        //アップロード自体は input タグの機能で完結するため、表示更新だけしてあげればよい。
        update_file_list_html();
    });
}
init();