// 音乐页数据。
// 「我喜欢的歌」只做文字+原创封面展示（不上传音频，也不使用真实专辑封面——
// 唱片封面是唱片公司的美术作品，公开网页展示同样需要授权）。
// 封面图由 AI 按每首歌的私人标签意象生成，是本站原创插画。
// BGM 是程序合成的「雨中森林」环境音（雨滴颗粒/雨幕/远雷，零版权负担）。
// 鼓演奏视频为本人录制，音频做过现场感处理。

const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

// ---- 背景音乐（程序合成，可播放）----
export const bgm = {
  id: 'bgm-rainforest',
  title: '雨中森林（环境音 BGM）',
  artist: '程序合成',
  tag: '雨滴 · 雨幕 · 远雷',
  src: asset('music/bgm-rainforest-v2.mp3'),
  cover: asset('music/covers/rainforest.webp'),
  note: '雨滴颗粒（下滑频率正弦脉冲 + 稀疏回波扩散）+ 雨幕垫底（粉噪低通）+ 远雷（棕噪脉冲）三层合成，三分钟循环',
}

// ---- 我的鼓演奏（本人录制）----
export const drumVideo = {
  id: 'drum-cover',
  title: '架子鼓训练视频',
  desc: '这一段是我在演奏草东没有派对的《大石碎胸口》，视频展现的是其最后一段的高潮片段。',
  src: asset('music/drum-video.mp4'),
  poster: asset('music/covers/drum.webp'),
  alt: '架子鼓训练视频：鼓手演奏《大石碎胸口》高潮片段',
}

// ---- 我喜欢的歌（歌单墙，原创意象封面，仅展示）----
// cover 是按每首歌的私人标签意象生成的原创插画，不指向任何真实专辑。
export const wishlist = [
  { id: 'libai', title: '李白', artist: '李荣浩', tag: '要是能重来', hue: 12, cover: asset('music/covers/libai.webp') },
  { id: 'zuijia-sunyou', title: '最佳损友', artist: '陈奕迅', tag: '朋友，我当你一秒朋友', hue: 210, cover: asset('music/covers/sunyou.webp') },
  { id: 'xin-diqiu', title: '新地球', artist: '林俊杰', tag: '赛博乡愁', hue: 160, cover: asset('music/covers/diqiu.webp') },
  { id: 'hongchen-kezhan-dj', title: '红尘客栈（DJ 版）', artist: '周杰伦', tag: '武侠舞池', hue: 340, cover: asset('music/covers/kezhan.webp') },
  { id: 'pengyou-de-jiu', title: '朋友的酒', artist: '李晓杰', tag: '饭局 BGM', hue: 36, cover: asset('music/covers/jiu.webp') },
  { id: 'wangfei', title: '王妃', artist: '萧敬腾', tag: '夜店摇滚', hue: 275, cover: asset('music/covers/wangfei.webp') },
  { id: 'qingchun-buda-yang', title: '青春不打烊', artist: '王梓钰', tag: '热血夜间档', hue: 190, cover: asset('music/covers/qingchun.webp') },
  { id: 'pipa-xing-dj', title: '琵琶行（DJ 版）', artist: '传统曲目改编', tag: '国风电音', hue: 25, cover: asset('music/covers/pipa.webp') },
  { id: 'gulou', title: '鼓楼', artist: '赵雷', tag: '民谣散步', hue: 100, cover: asset('music/covers/gulou.webp') },
]
