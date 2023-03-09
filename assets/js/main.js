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
    ownPlaylist :[],
    songs :[
        {
            name: 'BAD MAN',
            singer: 'Lil Shady ft Chee',
            path: './assets/music/BADMAN-LilShadyCheeNu-7990791.mp3',
            image: './assets/pics/LilShady_badman.jpg'
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
            name: 'Come Back to Me',
            singer: 'Deeper Purpose',
            path:'./assets/music/Deeper Purpose - Come Back to Me (Extended Mix) on Traxsource.mp3' ,
            image: './assets/pics/come_back_to_me.jpg'
        },
        {
            name: 'Find a Place',
            singer: 'Censored X',
            path:'./assets/music/Find A Place - Censored X.mp3' ,
            image: './assets/pics/find_a_place.jfif'
        },
        {
            name: 'Game',
            singer: 'Mowe, Vamero',
            path:'./assets/music/Game - Mowe, Vamero.mp3' ,
            image: './assets/pics/game.jpg'
        },
        {
            name: 'Give It To Me',
            singer: 'Justin Timberlake, Timbaland, Nelly Furtado',
            path:'./assets/music/Give It To Me - Justin Timberlake, Timbaland, Nelly Furtado.mp3' ,
            image: './assets/pics/Give_It_to_Me.png'
        },
        {
            name: 'Obsession ',
            singer: 'Consoul Trainin, Steven Aderinto, DuoViolins',
            path:'./assets/music/Obsession - Consoul Trainin, Steven Aderinto, DuoViolins.mp3' ,
            image: './assets/pics/artworks-ACUbNX60DSU4-0-t500x500.jpg'
        },
        {
            name: 'Planet In The Sky',
            singer: 'Klingande, Merk & Kremont, MKLA',
            path:'./assets/music/Planet In The Sky - Klingande, Merk & Kremont, MKLA.mp3' ,
            image: './assets/pics/planet_in_the_sky.jpg'
        },
        {
            name: 'Pump',
            singer: 'Valentino Khan',
            path:'./assets/music/Pump - Valentino Khan.mp3' ,
            image: './assets/pics/pump.jpg'
        },
        {
            name: 'Poppin (Extended Mix)',
            singer: 'Bassjackers & Pep & Rash',
            path:'./assets/music/Download Bassjackers & Pep & Rash - Poppin (Extended Mix)(2018) №123499728 - download free mp3 - mp3.pm.mp3' ,
            image: './assets/pics/poppin.png'
        },
        {
            name: 'In The Club ',
            singer: 'Swanky Tunes',
            path:'./assets/music/Swanky_Tunes_-_In_The_Club_Extended_Mix_by_DragoN_Sky_(mp3.pm).mp3' ,
            image: './assets/pics/in_the_club.jpg'
        },
        {
            name: 'Hard',
            singer: 'Jewelz & Sparks',
            path:'./assets/music/Hard - Jewelz & Sparks.mp3' ,
            image: './assets/pics/hard.jpg'
        },
        {
            name: 'Barraca Vs. Blah Blah Blah (WeDamnz Mashup)',
            singer: 'Garmiani, Armin van Buuren',
            path:'./assets/music/Barraca Vs. Blah Blah Blah (WeDamnz Mashup) - Garmiani, Armin van Buuren.mp3' ,
            image: './assets/pics/barraca.jpg'
        },
        {
            name: 'Gimme that bounce',
            singer: 'Mau P',
            path:'./assets/music/Mau P - Gimme that bounce » Скачать новую песню 2023 бесплатно.mp3' ,
            image: './assets/pics/gimmethatbounce.png'
        },
        {
            name: 'Looking 4 U',
            singer: 'Sonny Fodera',
            path:'./assets/music/Sonny Fodera - Looking 4 U.mp3' ,
            image: './assets/pics/looking4U.jpg'
        },
        {
            name: 'Freak 2 The Core',
            singer: 'Jakeshoredrive & The Williams Fam',
            path:'./assets/music/Jakeshoredrive & The Williams Fam - Freak 2 The Core.mp3' ,
            image: './assets/pics/freak2thecore.png'
        },
        {
            name: 'Standard',
            singer: 'Linius Ft. Kordas - (KEAN DYSSO Remix)',
            path: './assets/music/Linius Ft. Kordas - Standard (KEAN DYSSO Remix) [OUT NOW] by KEAN DYSSO.mp3',
            image: './assets/pics/standard_kean-dysso.jpg'
        },
        {
            name: 'Astronaut In The Ocean',
            singer: '[Ibrahim & Ømer ReMiX] by CiufleA Kode',
            path: './assets/music/Masked Wolf - Astronaut In The Ocean [Ibrahim & Ømer ReMiX] by ♛ CiufleA Kode ♛.mp3',
            image: './assets/pics/astronautInTheOcean_ibrahim.jpg'
        },
        {
            name: 'Batshit',
            singer: 'SOFI TUKKER - (Ilkay Sencan Remix)',
            path: './assets/music/SOFI TUKKER - Batshit (Ilkay Sencan Remix) [Ultra Music] by Ilkay Sencan.mp3',
            image: './assets/pics/batshit.jpg'
        },
        {
            name: 'RAVE',
            singer: 'Dxrk ダーク',
            path: './assets/music/RAVE by Dxrk ダーク.mp3',
            image: './assets/pics/rave_dxrk.jpg'
        },
        {
            name: 'ROSES',
            singer: 'MVDNES by Hassi',
            path: './assets/music/ROSES-MVDNES by 𝗛𝗮𝘀𝘀𝗶💸.mp3',
            image: './assets/pics/roses_mvdnes.jpg'
        },
        {
            name: 'White Kicks',
            singer: 'Linius Ft. Kordas (KEAN DYSSO Remix)',
            path: './assets/music/Linius Ft. Kordas - White Kicks (KEAN DYSSO Remix) by KEAN DYSSO.mp3',
            image: './assets/pics/whiteKicks_linius.jpg'
        },
        {
            name: 'Problems',
            singer: 'KVPV',
            path: './assets/music/KVPV - Problems by Big Mamas House Records.mp3',
            image: './assets/pics/problems_kvpv.png'
        },
        {
            name: 'The Boy Next Door',
            singer: 'Camouflage (feat. Sjaak & Stepherd & Jozo & Lenji) ',
            path: './assets/music/The Boy Next Door - Camouflage (feat. Sjaak & Stepherd & Jozo & Lenji) [OUT NOW] by Spinning Records.mp3',
            image: './assets/pics/theBoyNextDoor_camouflage.jpg'
        },
        {
            name: 'Turn On The Lights again (Remix)',
            singer: 'Fred again.. X Swedish House Mafia (feat. Future)',
            path: './assets/music/Fred again.. X Swedish House Mafia (feat. Future) - Turn On The Lights again.. (Maddix Techno Remix) by Maddix.mp3',
            image: './assets/pics/turnOnTheLightsAgain_fred-again.jpg'
        },
        {
            name: 'Therefore i am',
            singer: 'ed3nvids',
            path: './assets/music/therefore i am by ed3nvids.mp3',
            image: './assets/pics/thereforeIam_ed3nvids.jpg'
        },
        {
            name: 'PSY Or DIE',
            singer: 'Ishimaru',
            path: './assets/music/Ishimaru - PSY Or DIE by ISHIMARU.mp3',
            image: './assets/pics/psyordie_ishimaru.jpg'
        },
        {
            name: 'Sharks (Remix)',
            singer: 'Imagine Dragons (Remix) by Juke Box',
            path: './assets/music/Sharks - Imagine Dragons (Remix) by Juke Box.mp3',
            image: './assets/pics/sharks_imaginedragon.png'
        },
        {
            name: 'Good Days ( Remix)',
            singer: 'LIQUID (KREAM Remix)',
            path: './assets/music/SZA - Good Days (KREAM Remix) by LIQUID - LAB.mp3',
            image: './assets/pics/goodday_kream.jpg'
        },
        {
            name: 'Saving Grace',
            singer: 'As I Am',
            path: './assets/music/As I Am - Saving Grace (Defected Records) by AS I AM.mp3',
            image: './assets/pics/savingGrace_asIam.jpg'
        },
        {
            name: 'Anything Tonight',
            singer: 'Dance Cult',
            path: './assets/music/Dance Cult - Anything Tonight [Thissongissick.com Premiere] [Limited Free Download] by Thissongissick.com.mp3',
            image: './assets/pics/anythingtonight_danceCult.jpg'
        },
        {
            name: 'Hideaway (Remix)',
            singer: 'Kiesza (Joey Azure remix)',
            path: './assets/music/Kiesza - Hideaway (Joey Azure Remix) by Joey Azure.mp3',
            image: './assets/pics/hideaway_kiesza.jpg'
        },
        // {
        //     name: '',
        //     singer: '',
        //     path: './assets/music/',
        //     image: './assets/pics/'
        // },
        // {
        //     name: '',
        //     singer: '',
        //     path: './assets/music/',
        //     image: './assets/pics/'
        // }
        
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
            _this.render();
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
                alert('coming soon')
            }
        }

    },
    scrollToActiveSong: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block: "center", inline: "nearest"
            })
        },200)
    },
    loadCurrSong: function(){
        playername.textContent =this.currSong.name
        cdThumb.style.backgroundImage = `url('${this.currSong.image}')`
        audio.src = this.currSong.path
        this.scrollToActiveSong();
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
        this.ownPlaylist.push(this.currIndex);
        console.log(this.ownPlaylist);
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
            if(this.ownPlaylist.length === this.songs.length){
                this.ownPlaylist = [];
            }
        }while(this.ownPlaylist.includes(newIndex) == true)
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

