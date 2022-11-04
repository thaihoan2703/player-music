const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist');
const playername = $('.player_name');
const cdThumb = $('.cd-thumb');
const cd = $('.cd');
const audio = $('#audio');
const playBtn =  $('.fa-play')
const player = $('.player');
const progress = $('.progress');
const nextBtn = $('.playNext')
const preBtn = $('.playPre')
const shuffleBtn = $('.shuffle');
const replayBtn = $('.replay');

const app ={
    currIndex : 0,
    isPlaying: false,
    isShuffle: false,
    isReplay : false,
    songs :[
        {
            name: 'Em là',
            singer: 'Mono',
            path: './assets/music/EmLa-MONOOnionn-7736094.mp3',
            image: './assets/pics/mono.jpg'
        },
        {
            name: 'Waiting for you',
            singer: 'Mono',
            path: './assets/music/WaitingForYou-MONOOnionn-7733882.mp3',
            image: './assets/pics/mono.jpg'
        },
        {
            name: 'Chỉ là lời nói',
            singer: 'Chung Thanh Duy',
            path: './assets/music/ChiLaLoiNoi-ChungThanhDuy-7565204.mp3',
            image: './assets/pics/ChungThanhDuy-ChiLaLoiNoi.jpg'
        },
        {
            name: 'Một chút thôi',
            singer: 'Bray & Hella',
            path: './assets/music/MotChutThoi-BRayHelia-8037657.mp3',
            image: './assets/pics/Bray_MotChutThoi.jpg'
        },
        {
            name: 'BAD MAN',
            singer: 'Lil Shady ft Chee',
            path: './assets/music/BADMAN-LilShadyCheeNu-7990791.mp3',
            image: './assets/pics/LilShady_badman.jpg'
        },
        {
            name: 'Love U So',
            singer: 'WEAN & Tùng',
            path:'./assets/music/LoveUSo-WEANTung-7864509.mp3' ,
            image: './assets/pics/WEAN.jpg'
        },
        {
            name: 'She Knows',
            singer: 'CM1X & Johnny Lamar',
            path: './assets/music/SheKnows-CM1XJohnnyLamar-8019747.mp3',
            image: './assets/pics/CM1X_sheKnows.jpg'
        },
        {
            name: 'Kỉ Nguyên Mới',
            singer: 'Wxrdie & KayC',
            path: './assets/music/KiNguyenMoi1-WxrdieKayCMachiot-7813436.mp3',
            image: './assets/pics/wxrdie_kiNguyenMoi.jpg'
        },
        {
            name: 'Ngủ sớm đi em',
            singer: 'DucMinh',
            path:'./assets/music/NguSomDiEm-DucMinh-7583504.mp3' ,
            image: './assets/pics/DucMinh_NguSomDiEm.jpg'
        },
        {
            name: 'LO HI',
            singer: 'Lil Wuyn & SMO',
            path: './assets/music/LoHi-LilWuynSMO-7802475.mp3',
            image: './assets/pics/LoHi_LilWuyn.jpg'
        },
        {
            name: 'Xã hội rắc rối',
            singer: 'Karik',
            path:'./assets/music/XaHoiRacRoi-Karik_3f4pa.mp3' ,
            image: './assets/pics/karik.png'
        },
        {
            name: 'Good Bye My Love',
            singer: 'Yến Nhi & Yến Trang',
            path:'./assets/music/GoodByeMyLove-YenTrangYenNhi_645e.mp3' ,
            image: './assets/pics/Yan-Trang.jpg'
        }
    ],
    render: function(){
        const htmls = this.songs.map( (song,index) => {
            return `
            <div class="song ${index === this.currIndex ? 'active' : ''}" data-index = ${index}>
                <img src="${song.image}" alt="" style="border-radius:50%">
                <div class="song-detail">
                    <h3 class="song-name">${song.name}</h3>
                    <div class="singer">${song.singer}</div>
                </div>
                <div class="option"><i class="fa fa-ellipsis-h"></i></div>
            </div>   
            `
        })
        $('.playlist').innerHTML = htmls.join('');
        
    },
    defineProperties: function(){
        Object.defineProperty(this,'currSong',{
            get: function(){
                return this.songs[this.currIndex]
            }
        })
    },
    handleEvents: function(){
        const _this = this;
        //xử lý phóng to thu nhỏ cd
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth; 
        const cdHeight = cd.offsetHeight;
        document.onscroll = function(){
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newWidth = cdWidth - scrollTop;
            const newHeight = cdHeight - scrollTop;

            cd.style.width = newWidth > 0 ? newWidth +'px': 0
            cd.style.height = newHeight > 0 ? newHeight +'px': 0
            cd.style.opacity = newHeight / cdHeight;
        }
        //xu ly quay CD
        const cdThumbAnimate = cdThumb.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
        //xử lý khi click play
        playBtn.onclick = function (){
            if(playBtn.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }
        }
        
        cdThumbAnimate.pause()
        audio.onplay = function(){
            playBtn.isPlaying = true;     
            playBtn.classList.remove('fa-play')
            playBtn.classList.add('fa-pause')
            cdThumbAnimate.play()
            playlist.querySelector(".song.active img").style.animationPlayState = 'running'
        }
        audio.onpause = function(){
            playBtn.isPlaying = false;
            playBtn.classList.remove('fa-pause')
            playBtn.classList.add('fa-play');
            cdThumbAnimate.pause()
            playlist.querySelector(".song.active img").style.animationPlayState = 'paused'
        }

        //thay đổi tiến độ bài hát
        audio.ontimeupdate = function(){
            const progressPercent = Math.round((audio.currentTime / audio.duration)*100)
            progress.value = progressPercent;
        }
        //xu ly khi tua nhac
        progress.onchange = function(e){
            const seekTime = audio.duration/100 * e.target.value
            audio.currentTime = seekTime;
        }

        //xu ly next song
        nextBtn.onclick = function(){
            if(_this.isShuffle){
                _this.shuffleSong();
            }else{
                _this.nextSong()
            }
            audio.play();
            _this.render()
        }
        //xu ly previous song
        preBtn.onclick = function(){
            if(_this.isShuffle){
                _this.shuffleSong();
            }else{
                _this.preSong();
            }
            audio.play();
            _this.render()
        }
        // xu ly shuffle song
        shuffleBtn.onclick = function(){
            _this.isShuffle = !_this.isShuffle
            shuffleBtn.classList.toggle('active',_this.isShuffle);
        }
        //xu ly tu dong chuyen bai
        audio.onended = function(){
            if(_this.isReplay){
                audio.play()
            }else{
                if(_this.isShuffle){
                    _this.shuffleSong();
                    audio.play()
                    _this.render()
                }else{
                    _this.nextSong()
                    audio.play()
                    _this.render()
                }
            }
        }
        //xu ly replay bai hat
        replayBtn.onclick = function(){
            _this.isReplay = !_this.isReplay
            replayBtn.classList.toggle('active',_this.isReplay)
        }
        //xu ly phat bai hat khong bi trung

        //xu ly click vao bai hat
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            //xu ly khi click vao song
            if(songNode && !e.target.closest('.option')){
                if(songNode){
                    _this.currIndex = Number(songNode.dataset.index);
                    _this.loadCurrSong();
                    audio.play();
                    _this.render();
                }
            }
            if(e.target.closest('.option')){
                alert('yeu em')
            }
        }

    },
    loadCurrSong: function(){
        playername.textContent =this.currSong.name
        cdThumb.style.backgroundImage = `url('${this.currSong.image}')`
        audio.src = this.currSong.path

    },
    nextSong: function(){
        this.currIndex++;
        if(this.currIndex >= this.songs.length ){
            this.currIndex = 0;
        }
        this.loadCurrSong();
    },
    preSong: function(){
        this.currIndex--;
        if(this.currIndex < 0){
            this.currIndex = this.songs.length -1 ;
        }
        this.loadCurrSong();
    },
    shuffleSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currIndex)
        this.currIndex = newIndex
        this.loadCurrSong();
    },
    start: function(){
        this.defineProperties();

        this.handleEvents();

        this.loadCurrSong();

        this.render();

    }

}

app.start();

