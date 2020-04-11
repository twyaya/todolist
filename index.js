		var delete_audio = document.getElementById("delete_audio");  //啟用音效
		var drawing_on_paper_audio = document.getElementById("drawing_on_paper_audio"); //啟用音效
		
		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()  //啟用提示
		})

		
		
		moment.locale('zh-tw', {     //中文化
		      months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
		      monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
		      weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
		      weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
		      weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
		      longDateFormat: {
		        LT: 'Ah點mm分',
		        LTS: 'Ah點m分s秒',
		        L: 'YYYY-MM-DD',
		        LL: 'YYYY年MMMD日',
		        LLL: 'YYYY年MMMD日Ah點mm分',
		        LLLL: 'YYYY年MMMD日ddddAh點mm分',
		        l: 'YYYY-MM-DD',
		        ll: 'YYYY年MMMD日',
		        lll: 'MMMD日HH點mm分',
		        llll: 'YYYY年MMMD日ddddAh點mm分'
		      },
		      meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
		      meridiemHour: function (h, meridiem) {
		        let hour = h;
		        if (hour === 12) {
		          hour = 0;
		        }
		        if (meridiem === '凌晨' || meridiem === '早上' ||
		          meridiem === '上午') {
		          return hour;
		        } else if (meridiem === '下午' || meridiem === '晚上') {
		          return hour + 12;
		        } else {
		          // '中午'
		          return hour >= 11 ? hour : hour + 12;
		        }
		      },
		      meridiem: function (hour, minute, isLower) {
		        const hm = hour * 100 + minute;
		        if (hm < 600) {
		          return '凌晨';
		        } else if (hm < 900) {
		          return '早上';
		        } else if (hm < 1130) {
		          return '上午';
		        } else if (hm < 1230) {
		          return '中午';
		        } else if (hm < 1800) {
		          return '下午';
		        } else {
		          return '晚上';
		        }
		      },
		      calendar: {
		        sameDay: function () {
		          return this.minutes() === 0 ? '[今天]Ah[點整]' : '[今天]LT';
		        },
		        nextDay: function () {
		          return this.minutes() === 0 ? '[明天]Ah[點整]' : '[明天]LT';
		        },
		        lastDay: function () {
		          return this.minutes() === 0 ? '[昨天]Ah[點整]' : '[昨天]LT';
		        },
		        nextWeek: function () {
		          let startOfWeek, prefix;
		          startOfWeek = moment().startOf('week');
		          prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
		          return this.minutes() === 0 ? prefix + 'dddA點整' : prefix + 'dddAh點mm';
		        },
		        lastWeek: function () {
		          let startOfWeek, prefix;
		          startOfWeek = moment().startOf('week');
		          prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
		          return this.minutes() === 0 ? prefix + 'dddAh點整' : prefix + 'dddAh點mm';
		        },
		        sameElse: 'LL'
		      },
		      ordinalParse: /\d{1,2}(日|月|周)/,
		      ordinal: function (number, period) {
		        switch (period) {
		          case 'd':
		          case 'D':
		          case 'DDD':
		            return number + '日';
		          case 'M':
		            return number + '月';
		          case 'w':
		          case 'W':
		            return number + '周';
		          default:
		            return number;
		        }
		      },
		      relativeTime: {
		        future: '%s内',
		        past: '%s前',
		        s: '幾秒',
		        m: '1 分鐘',
		        mm: '%d 分鐘',
		        h: '1 小時',
		        hh: '%d 小時',
		        d: '1 天',
		        dd: '%d 天',
		        M: '1 個月',
		        MM: '%d 个月',
		        y: '1 年',
		        yy: '%d 年'
		      },
		      week: {
		        dow: 1, 
		        doy: 4  
		      }
		    });
		
		        var time = new Vue({
		            el:'#time',
		            data:{
		                now_time: moment().format('LL')
		            },
		            mounted: function () {  
		                var _this = this;   
		                this.timer = setInterval(function () {
		                    _this.now_time = moment().format('LL');;
		                },1000);
						
		            },
		            beforeDestory:function () { 
		                if (this.timer){
		                    clearInterval(this.timer);  
		                }
		            }
		        })
		
		
		var ctx = document.getElementById("myChart");
		var score =  [0, 0, 0, 0, 0, 0, 0];
		
		
		var now_weekday = moment().weekday();
		
		
		
        a = new Vue({
            el: '#app',
            data: {
				myChart : new Chart(ctx, {
					type: 'line',
					data: {
						labels: ["週一", "週二", "週三", "週四", "週五", "週六", "週日"],
						datasets: [{
							label: '完成事項數量',
							data: score,
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)',
								'rgba(238, 108, 255, 51)'
							],
							borderColor: [
								'rgba(255,99,132,1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)',
								'rgba(238, 108, 255, 51)'
							],
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero:true
								}
							}]
						}
					}
				}),
                noteSelected: {
                    name: '',
                    content: '',
					isDone: '未完成',
					textDecorationStyle: '',
					color: ''
                },
                newNote: {
                    name: '',
                    content: '',
					isDone: '未完成',
					saveTime: '',
					textDecorationStyle: '',
					color: ''
                },
                notes: JSON.parse(localStorage.getItem('notes')) || [],  //儲存
				isShow: false,
				sound_volume: 0,
				number_of_matters: JSON.parse(localStorage.getItem('number_of_matters')) || 0
            },
            watch: {
                notes: {
                    handler: 'saveNotes',  //監聽
                    deep: true
                },
				sound_volume: function() {
					delete_audio.volume = this.sound_volume
					drawing_on_paper_audio.volume = this.sound_volume
				}
            },
            methods: {
                selectNote(note) {
                    this.noteSelected.name = note.name
                    this.noteSelected.content = note.content
					this.noteSelected.isDone = note.isDone
					this.noteSelected.textDecorationStyle = note.textDecorationStyle
					this.noteSelected.saveTime = note.saveTime
					this.noteSelected.color = note.color
                },
                addNote() {
                    if (this.newNote.name.trim().length == 0 || this.newNote.content.trim().length == 0) {
                        this.isShow = true
                        return
                    }
					else{
						this.isShow = false
					}
                    const note = {
                        name: this.newNote.name,
                        content: this.newNote.content,
						isDone: '未完成',
						textDecorationStyle: '',
						color: '',
						saveTime: this.noteSelected.saveTime = moment().format('lll'),
                        created: new Date()
                    }
                    this.notes.push(note)
                    this.newNote.content = ''
                    this.newNote.name = ''
                },
                deleteNote(note) {
                    // 判斷目前選定的note位置陣列中的位置
                    var found = false;
                    for (var i = 0; i < this.notes.length; i++) {
                        if (this.notes[i].name == note.name) {
                            found = true;
                            break;
                        }
                    }
                    // 如果有找到就刪除
                    if (found) {
                        this.notes.splice(i, 1)
                    }
                    // 隱藏刪除視窗
                    $('#deleteModal').modal('hide')
					
					//播放音訊
					delete_audio.play()
					this.number_of_matters = this.number_of_matters - 1
                },
                saveNotes() {
                    localStorage.setItem('notes', JSON.stringify(this.notes))
					localStorage.setItem('number_of_matters', JSON.stringify(this.number_of_matters))
                    console.log('新記事已儲存', new Date())
                },
				editNotes(note) {
					for (var i = 0; i < this.notes.length; i++) {  //搜尋並更改
						if (this.notes[i].name == note.name) {
							this.notes[i].content = this.newNote.content
							this.notes[i].name = this.newNote.name
							this.notes[i].isDone = '未完成'
							this.notes[i].color = ''
							this.notes[i].textDecorationStyle = ''
							this.notes[i].saveTime = moment().format('lll')
							break;
						}
					}
					
					this.newNote.content = ''
					this.newNote.name = ''
					$('#editModel').modal('hide')
					drawing_on_paper_audio.play()  //播放音效
				},
				Done(note) {
					for (var i = 0; i < this.notes.length; i++) {
						if (this.notes[i].name == note.name) {
							this.notes[i].isDone = '完成'
							this.notes[i].color = 'green'
							this.notes[i].textDecorationStyle = 'line-through'
						}
					}
					
					this.number_of_matters = this.number_of_matters + 1
					localStorage.setItem('number_of_matters', JSON.stringify(this.number_of_matters))
					
					switch(now_weekday){
						case 0:
							score[0] += 1;
							break;
						case 1:
							score[1] += 1;
							break;
						case 2:
							score[2] += 1;
							break;
						case 3:
							score[3] += 1;
							break;
						case 4:
							score[4] += 1;
							break;
						case 5:
							score[5] += 1;
							break;
						case 6:
							score[6] += 1;
							break;
					}
					this.myChart.update();  //更新圖表
					
				},
            }
        })
