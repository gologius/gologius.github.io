

var state_ilst = new Vue({
    el: '#state-list',
    data: {
        areas: [
		{code : 1, name: "北海道", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 2, name: "青森", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 3, name: "岩手", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 4, name: "宮城", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 5, name: "秋田", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 6, name: "山形", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 7, name: "福島", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		
		{code : 8, name: "茨城", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 9, name: "栃木", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 10, name: "群馬", color: "#759ef4", hoverColor: "#b3b2ee", visited: false},
		{code : 11, name: "埼玉", color: "#759ef4", hoverColor: "#b3b2ee", visited: false},
		{code : 12, name: "千葉", color: "#759ef4", hoverColor: "#b3b2ee", visited: false},
		{code : 13, name: "東京", color: "#759ef4", hoverColor: "#b3b2ee", visited: false},
		{code : 14, name: "神奈川", color: "#759ef4", hoverColor: "#b3b2ee", visited: false},
		
		{code : 15, name: "新潟", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 16, name: "富山", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 17, name: "石川", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 18, name: "福井", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 19, name: "山梨", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 20, name: "長野", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 21, name: "岐阜", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 22, name: "静岡", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 23, name: "愛知", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		
		{code : 24, name: "三重", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 25, name: "滋賀", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 26, name: "京都", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 27, name: "大阪", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 28, name: "兵庫", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 29, name: "奈良", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 30, name: "和歌山", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		
		{code : 31, name: "鳥取", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 32, name: "島根", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 33, name: "岡山", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 34, name: "広島", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 35, name: "山口", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		
		{code : 36, name: "徳島", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 37, name: "香川", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 38, name: "愛媛", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 39, name: "高知", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		
		{code : 40, name: "福岡", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 41, name: "佐賀", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 42, name: "長崎", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 43, name: "熊本", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 44, name: "大分", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 45, name: "宮崎", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 46, name: "鹿児島", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
		{code : 47, name: "沖縄", color: "#759ef4", hoverColor: "#b3b2ee", visited:false},
	  ],
	  filter_flag: "0",
	  save_url : "",
	  random_state: "",
    },
	mounted: function() {		
	},
	methods: {
		can_show: function(index) {
			
			if (this.filter_flag == '' || 
				(this.filter_flag == 0 && !this.areas[index].visited) || 
				(this.filter_flag == 1 && this.areas[index].visited)){
				return true;
			}
			
			return false;
		},
		select_random: function() {
			const tmp_array = this.areas.filter(state=> state_ilst.can_show(state.code-1));
			
			if(tmp_array.length == 0) {
				alert("※対象が一つもありません");
				return;
			}
			
			const rand_index = Math.floor(Math.random() * tmp_array.length);
			this.random_state = tmp_array[rand_index].name;
			return;
		}
	},
	computed: {
		num_of_visited: function(){
			return this.areas.filter(state=>state.visited).length;
		},
		url_param: function() {
			const tmp_array = this.areas.map(item=> item.visited ? "1" : "0");
			return tmp_array.join("");
		}
	},
	watch: {
		areas: {
			handler: function(old_val, new_val){
				this.save_url = this.url_param;
			},				
			deep:true
		}
	}
});

var japan_map = new jpmap.japanMap(document.getElementById("my-map"), {
	areas: state_ilst.areas,
	showsPrefectureName: true,
	width: 1000,
	movesIslands: true,
	borderLineColor: "#FFFFFF",
	lang: 'ja',
	onSelect: function(data){
		data.area.visited = !data.area.visited;
		if (data.area.visited) {
			data.area.color = "#ffe966";
		}
		else {
			data.area.color = "#759ef4";	
		}
	}
});


