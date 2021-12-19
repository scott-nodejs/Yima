const bgm = uni.createInnerAudioContext();
bgm.autoplay = true

var music = {
    //mute 表示是否是静音，，默认不静音
    playBgm({mute=false}){
		bgm.src = 'http://img.hazer.top/music.mp3'
		bgm.loop = true;
        if (!bgm) return;
        if(mute){
			console.log("bbb" + JSON.stringify(bgm));
            bgm.pause()
        }else{
			console.log("aaa" + JSON.stringify(bgm));
            bgm.play()
        }
        
        bgm.onPause(()=>{
            console.log('暂停背景音乐');
        })
        bgm.onPlay(() => {
            console.log('开始播放音乐#######');
        })
        bgm.onError((res) => {
            console.log(res)
        })
    }
}
module.exports = music