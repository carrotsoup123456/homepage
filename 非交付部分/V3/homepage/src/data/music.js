// 歌单数据。
// 「我喜欢的歌」只做文字展示（歌名/歌手/标签），不上传音频文件——
// 流行音乐录音的公开传播需要唱片公司授权，课程公开主页放不了。
// BGM 播放器用「演示音轨」跑通全部交互；日后拿到可授权音频
// （自己翻唱 / CC 授权曲 / 已购买授权），把文件放进 public/music/
// 并在下方 demoTracks / wishlist 对应条目里补上 src 即可生效。

const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

// ---- 演示音轨（程序合成，无版权负担，可直接播放）----
export const demoTracks = [
  {
    id: 'demo-ambient',
    title: '林间雾气（演示音轨）',
    artist: '程序合成',
    tag: '氛围',
    src: asset('music/demo-ambient.mp3'),
    note: 'ffmpeg 合成的三和弦垫底，用来演示播放器交互',
  },
  {
    id: 'demo-pluck',
    title: '胡萝卜拨弦（演示音轨）',
    artist: '程序合成',
    tag: '轻快',
    src: asset('music/demo-pluck.mp3'),
    note: '衰减正弦模拟拨弦，胡萝卜园主题小样',
  },
  {
    id: 'demo-groove',
    title: '菜垄节奏（演示音轨）',
    artist: '程序合成',
    tag: '律动',
    src: asset('music/demo-groove.mp3'),
    note: '低音节奏型，测试循环播放与自动切歌',
  },
]

// ---- 我喜欢的歌（歌单墙，仅文字展示）----
// 每首的 accent 用 HSL 色相区分卡片封面色块；tag 是我给它的私人标签。
export const wishlist = [
  { id: 'libai', title: '李白', artist: '李荣浩', tag: '要是能重来', hue: 12 },
  { id: 'zuijia-sunyou', title: '最佳损友', artist: '陈奕迅', tag: '朋友，我当你一秒朋友', hue: 210 },
  { id: 'xin-diqiu', title: '新地球', artist: '林俊杰', tag: '赛博乡愁', hue: 160 },
  { id: 'hongchen-kezhan-dj', title: '红尘客栈（DJ 版）', artist: '周杰伦', tag: '武侠舞池', hue: 340 },
  { id: 'pengyou-de-jiu', title: '朋友的酒', artist: '李晓杰', tag: '饭局 BGM', hue: 36 },
  { id: 'wangfei', title: '王妃', artist: '萧敬腾', tag: '夜店摇滚', hue: 275 },
  { id: 'qingchun-buda-yang', title: '青春不打烊', artist: '王梓钰', tag: '热血夜间档', hue: 190 },
  { id: 'pipa-xing-dj', title: '琵琶行（DJ 版）', artist: '传统曲目改编', tag: '国风电音', hue: 25 },
  { id: 'gulou', title: '鼓楼', artist: '赵雷', tag: '民谣散步', hue: 100 },
]
