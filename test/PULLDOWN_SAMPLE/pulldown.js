const MENU_M = [
    { layer: 0, name: 'くだもの', id: '0', before_id: '' },
    { layer: 0, name: 'どうぶつ', id: '1', before_id: '' },

    { layer: 1, name: 'すいか', id: '0', before_id: '0' },
    { layer: 1, name: 'れもん', id: '1', before_id: '0' },
    { layer: 1, name: 'りんご', id: '2', before_id: '0' },
    { layer: 1, name: 'ごりら', id: '3', before_id: '1' },
    { layer: 1, name: 'らいおん', id: '4', before_id: '1' },
    { layer: 1, name: 'きりん', id: '5', before_id: '1' },

    { layer: 2, name: 'スイカバー', id: '0', before_id: '0' },
    { layer: 2, name: 'りんごあめ', id: '1', before_id: '2' },
    { layer: 2, name: 'りんごアイス', id: '2', before_id: '2' },
    { layer: 2, name: 'ゴリラダンス', id: '3', before_id: '3' },
    { layer: 2, name: 'ゴリラパンチ', id: '4', before_id: '3' },
    { layer: 2, name: 'ゴリラキック', id: '5', before_id: '3' },
    { layer: 2, name: 'ライオンハート', id: '6', before_id: '4' },
    { layer: 2, name: 'ライオンの心臓', id: '7', before_id: '4' },
    { layer: 2, name: 'ライオンの魂', id: '8', before_id: '4' },
    { layer: 2, name: 'キリンの脚', id: '9', before_id: '5' },
    { layer: 2, name: 'キリンの腕', id: '10', before_id: '5' },
];

var vivr_menu = new Vue({
    el: '#pulldown',
    data: {
        selected_stack: ['', '', ''], //ユーザー選択結果
    },
    computed: {
        //現状のユーザー選択(selected_stack)に対して、表示すべき選択肢を取得
        selectable_items: function () {
            
            var results = [];
            var layer = 0;
            for (layer = 0; layer <= this.selected_stack.length; layer++) {
                
                //上位層の選択結果を取得
                before_selected_id  = ''
                if (layer >= 1 ) {
                    before_selected_id = this.selected_stack[layer-1];
                }

                //該当層かつ、上位層の選択肢に合致するもののみ抽出
                layer_result = MENU_M.filter(function (value) {
                    return value.layer === layer && value.before_id === before_selected_id;
                });

                results.push(layer_result);
            }
            return results;
        },
        //watch関数をまともに動作させるためのラッパー
        //参考:https://qiita.com/haruyanagi17/items/d74c0b9546719ff88c63
        watch_selected_stack: function () {
            return Object.assign({}, this.selected_stack); // ディープコピーしたものを返す
        },
    },
    watch: {
        //選択肢が入力された際の動作定義
        watch_selected_stack: function (newval, oldval) {
            
            //変更箇所を検知
            var update_flag = false;
            var layer = 0;
            for(layer=0; layer < this.selected_stack.length; layer++){
                
                //変更箇所より後の選択肢は初期化する
                if(update_flag) {
                    this.selected_stack[layer] = '';
                }

                //変更されている箇所があれば、フラグを立てる
                if (newval[layer] !== oldval[layer]) {
                    update_flag = true;
                }
            }
        },      
    }
});
