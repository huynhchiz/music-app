const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

const replayBtn = $('.replay-btn')
const backwardBtn = $('.backward-btn')
const forwardBtn = $('.forward-btn')
const playBtn = $('.play-btn')
const pauseBtn = $('.pause-btn')
const randomBtn = $('.random-btn')
const repeat1Btn = $('.repeatOne-btn')
const repeatListBtn = $('.repeatList-btn')
const audio = $('audio')
const heading = $('.show-playing h3')
const cdImg = $('.cd')
const cd = $('#album-img')
const showPlaying = $('.show-playing')
const progress = $('#progress')

const app = {
    currentIndex: 1,
    repeatStatus: 'random',
    playList: [
        {
            name: 'Nấu Ăn Cho Em',
            singer: 'Đen Vâu',
            src: './css/audio/NauAnChoEm-Den-9466587.mp3',
            img: './css/img/nauanchoem.jpg'
        },
        {
            name: 'Anh Đã Sai Vì Anh Tin',
            singer: 'Mr Siro',
            src: './css/audio/AnhDaSaiViAnhTin-MrSiro-4694386.mp3',
            img: './css/img/mrsiro.jpg'
        },
        {
            name: 'Day Dứt Nỗi Đau',
            singer: 'Mr Siro',
            src: './css/audio/DayDutNoiDau-MrSiro-3569331.mp3',
            img: './css/img/mrsiro.jpg'
        },
        {
            name: 'Đưa Em Về Nhà',
            singer: 'Gree',
            src: './css/audio/DuaEmVeNhaa-GREYDChillies-9214678.mp3',
            img: './css/img/duaemvenha.jpg'
        },
        {
            name: 'Gương Mặt Lạ Lẫm',
            singer: 'Mr Siro',
            src: './css/audio/GuongMatLaLam-MrSiro-4583437.mp3',
            img: './css/img/mrsiro.jpg'
        },
        {
            name: 'Lặng Lẽ Tổn Thương',
            singer: 'Mr Siro',
            src: './css/audio/LangLeTonThuong-MrSiro-3569337.mp3',
            img: './css/img/mrsiro.jpg'
        },
        {
            name: 'Một Ngày Chẳng Nắng',
            singer: 'Pháo',
            src: './css/audio/MotNgayChangNang-Phao-9400644.mp3',
            img: './css/img/motngaychangnang.jpg'
        },
        {
            name: 'Tự Tình 2',
            singer: 'Trung Quân',
            src: './css/audio/TuTinh2LiveAtSoulOfTheForest-TrungQuanIdol-7847943.mp3',
            img: './css/img/tutinh2.jpg'
        },
        {
            name: 'Tìm Được Nhau Khó thế Nào',
            singer: 'Mr Siro',
            src: './css/audio/TimDuocNhauKhoTheNao-MrSiro-3505526.mp3',
            img: './css/img/mrsiro.jpg'
        },
        {
            name: 'Là Anh',
            singer: 'Phạm Lịch',
            src: './css/audio/LaAnh-PhamLichBMZ-8811329.mp3',
            img: './css/img/laanh.jpg'
        }
    ],
    
    renderPlayList()  {
        let htmls = ''
        for (let i = 0; i < this.playList.length; i++) {
            htmls +=  `
                <div class="song ${i === this.currentIndex ? 'song-active' : ''}">
                    <img id="list-img" src="${this.playList[i].img}" alt="img">
                    <div class="song-infor hover-white-infor">
                        <h4>${this.playList[i].name}</h4>
                        <h5>${this.playList[i].singer}</h5>
                    </div>
                    <div class="song-more hover-white-infor">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            ` 
        }
        $('.show-list').innerHTML = htmls;
    },

    handleScrollList() {
        const cdWitdh = cd.offsetWidth
        const showPlayingHeight = showPlaying.offsetHeight

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWitdh - scrollTop
            
            if (newCdWidth <= 0) {
                cd.style.width = 0 + 'px'
                showPlaying.style.height = showPlayingHeight - 250 +'px'
            } else {
                cd.style.width = newCdWidth + 'px'
                showPlaying.style.height = showPlayingHeight - scrollTop +'px'
                cd.style.opacity = newCdWidth / cdWitdh
            }
        }
    },

    getCurrentSong() {
        return this.playList[this.currentIndex]
    },

    loadCurrentSong() {
        heading.innerText = this.getCurrentSong().name
        audio.src = this.getCurrentSong().src
        cdImg.style.backgroundImage = `url(${this.getCurrentSong().img})`
    },

    scrollIntoCurrentSong() {
        $('.song-active').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    },

    handleShowCurrentSong() {
        
    },

    //CD rotate
    cdRotate: cdImg.animate([
        { transform: 'rotate(360deg)'}
    ],{
        duration: 10000,
        iterations: Infinity
    }),
    
    pauseCdRotate() {
        this.cdRotate.pause()
    },

    playCdRotate() {
        this.cdRotate.play()
    },

    handleReplay() {
        replayBtn.onclick = function() {
            audio.currentTime = 0;
            playBtn.click()
        }
    },

    handleBackward() {
        backwardBtn.onclick = function() {
            if (app.repeatStatus === 'random') {
                app.handlePlayRandomSong()
            } else {
                if (app.currentIndex > 0) {
                    app.currentIndex--
                } else {
                    app.currentIndex = app.playList.length - 1
                }
                app.loadCurrentSong()
                playBtn.click()
            }
        }
    },

    handleForward() {
        forwardBtn.onclick = function() {
            if (app.repeatStatus === 'random') {
                app.handlePlayRandomSong()
            } else {
                if (app.currentIndex >= app.playList.length - 1) {
                    app.currentIndex = 0
                } else {
                    app.currentIndex++
                }
                app.loadCurrentSong()
                playBtn.click()
                app.renderPlayList()
                app.scrollIntoCurrentSong()
            }
        }
    },

    handlePlayPause() {
        playBtn.onclick = function () {
            this.classList.remove('active-btn')
            pauseBtn.classList.add('active-btn')
            audio.play()
            app.playCdRotate()
        }
        pauseBtn.onclick = function () {
            this.classList.remove('active-btn')
            playBtn.classList.add('active-btn')
            audio.pause()
            app.pauseCdRotate()
        }
    },

    handleRepeatBtn() {
        randomBtn.onclick = function() {
            this.classList.remove('active-btn')
            repeat1Btn.classList.add('active-btn')
            app.repeatStatus = 'repeatOne'
        }
        repeat1Btn.onclick = function() {
            this.classList.remove('active-btn')
            repeatListBtn.classList.add('active-btn')
            app.repeatStatus = 'repeatList'
        }
        repeatListBtn.onclick = function() {
            this.classList.remove('active-btn')
            randomBtn.classList.add('active-btn')
            app.repeatStatus = 'random'
        }
    },

    handlePlayRandomSong() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * app.playList.length)
        } while (newIndex === app.currentIndex)
        app.currentIndex = newIndex
        app.loadCurrentSong()
        playBtn.click()
        app.renderPlayList()
        app.scrollIntoCurrentSong()
    },

    handleProgressTimeUpdate() {
        audio.ontimeupdate = function() {
            let timePercent = audio.currentTime / audio.duration * 1000
            progress.value = timePercent
        }
        progress.oninput = function () {
            audio.currentTime = audio.duration / 1000 * progress.value
        }
    },

    handleNextSong() {
        audio.onended = function() {
            if (app.repeatStatus === 'repeatOne') {
                replayBtn.click()
            } else {
                forwardBtn.click()
            }
        }
    },

    handleEvents() {
        this.pauseCdRotate()

        this.handleShowCurrentSong()

        this.handleScrollList()

        this.handleReplay()

        this.handleBackward()

        this.handleForward()

        this.handlePlayPause()

        this.handleRepeatBtn()

        this.handleProgressTimeUpdate()

        this.handleNextSong()
    },
    
    start() {
        this.renderPlayList()

        this.handleEvents()

        this.loadCurrentSong()
    },
}

app.start()







