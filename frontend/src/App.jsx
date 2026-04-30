import React, { useState, useEffect, useCallback } from 'react'

const fallbackPoetry = [
  {
    id: 1,
    title: '静夜思',
    author: '李白',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    translation: '明亮的月光洒在床前，好像地上泛起了一层霜。我抬起头来看那天窗外空中的一轮明月，不由得低头沉思，想起远方的家乡。',
    background: '这首诗写于唐玄宗开元十四年（726年）九月十五日，当时李白二十六岁，在扬州旅舍。秋日的夜晚，诗人抬头望见一轮明月高挂天空，思乡之情油然而生，写下了这首传诵千古的名作。',
    poetStory: '李白（701—762），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。他出生于西域碎叶城，幼年随父迁居四川。李白一生好游历，嗜酒作诗，性格豪放不羁。'
  },
  {
    id: 2,
    title: '望庐山瀑布',
    author: '李白',
    content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
    translation: '香炉峰在阳光的照射下生起紫色烟霞，远远望见瀑布似白色绢绸悬挂在山前。高崖上飞腾直落的瀑布好像有几千尺，让人恍惚以为银河从天上泻落到人间。',
    background: '此诗作于唐玄宗开元十三年（725年）前后，李白出蜀漫游，初次来到庐山。他被庐山瀑布的壮丽景象所震撼，以超凡的想象力写下了这首千古名篇。',
    poetStory: '李白自幼才华横溢，"五岁诵六甲，十岁观百家"。他一生大部分时间都在漫游中度过，足迹遍布大半个中国。杜甫评价他"笔落惊风雨，诗成泣鬼神"。'
  },
  {
    id: 3,
    title: '春望',
    author: '杜甫',
    content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。',
    translation: '长安沦陷，国家破碎，只有山河依旧；春天来了，人烟稀少的长安城里草木茂密。感伤国事，不禁涕泪四溅，鸟鸣惊心，徒增离愁别恨。',
    background: '此诗作于唐肃宗至德二年（757年）三月。安史之乱爆发后，长安被叛军攻陷，杜甫被俘困于长安城中。目睹国都沦陷的景象，又思念远在鄜州的家人，写下了这首感人至深的五言律诗。',
    poetStory: '杜甫（712—770），字子美，自号少陵野老，唐代伟大的现实主义诗人，被后人尊为"诗圣"。他一生忧国忧民，深刻反映了唐代由盛转衰的历史，被称为"诗史"。'
  },
  {
    id: 4,
    title: '赋得古原草送别',
    author: '白居易',
    content: '离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。远芳侵古道，晴翠接荒城。又送王孙去，萋萋满别情。',
    translation: '长长的原上草是多么茂盛，每年秋冬枯黄春来草色浓。无情的野火只能烧掉干叶，春风吹来大地又是绿茸茸。',
    background: '此诗作于唐德宗贞元三年（787年），白居易时年十六岁。白居易从江南到长安，带着诗文去拜见名士顾况。顾况读到"野火烧不尽，春风吹又生"时大为赞赏。',
    poetStory: '白居易（772—846），字乐天，号香山居士，唐代伟大的现实主义诗人。他主张"文章合为时而著，诗歌合为事而作"，倡导新乐府运动。'
  },
  {
    id: 5,
    title: '悯农',
    author: '李绅',
    content: '锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。',
    translation: '盛夏中午，烈日炎炎，农民还在劳作，汗珠滴入泥土。有谁想到，我们碗中的米饭，粒粒饱含着农民的血汗？',
    background: '此诗作于唐德宗贞元十五年（799年）前后。李绅年轻时目睹农民辛勤劳作却生活困苦的现实，深感同情，写下了这首家喻户晓的古诗。',
    poetStory: '李绅（772—846），字公垂，唐代诗人。他与白居易、元稹交好，是新乐府运动的参与者。后来官至宰相。'
  },
  {
    id: 6,
    title: '绝句',
    author: '杜甫',
    content: '两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。',
    translation: '两只黄鹂在翠绿的柳树间婉转地歌唱，一队整齐的白鹭直冲向蔚蓝的天空。',
    background: '此诗作于唐代宗广德二年（764年）春。安史之乱平定后，杜甫回到成都草堂，心情舒畅，面对生机勃勃的春景，即兴写下这首诗。',
    poetStory: '杜甫在成都草堂居住期间，创作了大量脍炙人口的诗篇。"读书破万卷，下笔如有神"正是他的自述。'
  }
]

const poetryTypes = [
  {
    name: '五言绝句',
    key: 'wuyan_jueju',
    description: '每句五个字，共四句，合计二十字。',
    structure: '第一句 ×××××\n第二句 ×××××\n第三句 ×××××\n第四句 ×××××',
    rhyme: '偶数句押韵（第二、四句），首句可押可不押。常用平声韵。',
    example: '静夜思（李白）\n床前明月光，疑是地上霜。\n举头望明月，低头思故乡。',
    tips: '五言绝句讲究意境深远，用最少的字表达最丰富的情感。注意平仄搭配，一般为"仄起"或"平起"两种格式。'
  },
  {
    name: '七言绝句',
    key: 'qiyan_jueju',
    description: '每句七个字，共四句，合计二十八字。',
    structure: '第一句 ×××××××\n第二句 ×××××××\n第三句 ×××××××\n第四句 ×××××××',
    rhyme: '偶数句押韵（第二、四句），首句可押可不押。常用平声韵。',
    example: '望庐山瀑布（李白）\n日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。',
    tips: '七言绝句比五言多了两个字的空间，更适合铺陈描写。注意前后呼应，起承转合要分明。'
  },
  {
    name: '五言律诗',
    key: 'wuyan_lvshi',
    description: '每句五个字，共八句，合计四十字。',
    structure: '首联：×××××，×××××。\n颔联：×××××，×××××。\n颈联：×××××，×××××。\n尾联：×××××，×××××。',
    rhyme: '偶数句押韵（第二、四、六、八句），首句可押可不押。一韵到底，常用平声韵。',
    example: '春望（杜甫）\n国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。',
    tips: '五言律诗要求颔联和颈联必须对仗工整。即第三四句、第五六句要形成对偶关系。'
  },
  {
    name: '七言律诗',
    key: 'qiyan_lvshi',
    description: '每句七个字，共八句，合计五十六字。',
    structure: '首联：×××××××，×××××××。\n颔联：×××××××，×××××××。\n颈联：×××××××，×××××××。\n尾联：×××××××，×××××××。',
    rhyme: '偶数句押韵（第二、四、六、八句），首句可押可不押。一韵到底，常用平声韵。',
    example: '登高（杜甫）\n风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。',
    tips: '七言律诗是最考验功力的体裁之一。颔联和颈联必须对仗，注意平仄交替和押韵。'
  },
  {
    name: '词（长短句）',
    key: 'ci',
    description: '又称长短句，按照词牌格律填写，句式长短不一。',
    structure: '依词牌而定，常见词牌有：\n· 如梦令（33字）\n· 浣溪沙（42字）\n· 蝶恋花（60字）\n· 水调歌头（95字）\n· 满江红（93字）',
    rhyme: '依词牌而定，有的一韵到底，有的可以换韵。词韵比诗韵更宽泛。',
    example: '如梦令（李清照）\n昨夜雨疏风骤，浓睡不消残酒。\n试问卷帘人，却道海棠依旧。\n知否，知否？应是绿肥红瘦。',
    tips: '写词要先选好词牌，然后严格按照词牌的字数、句式、平仄和押韵要求来填写。每个词牌都有固定的格律。'
  },
  {
    name: '自由体诗',
    key: 'free_verse',
    description: '不受格律限制，自由表达情感和意境的诗歌形式。',
    structure: '没有固定格式，可根据内容自由分行。\n注意节奏感和画面感的营造。',
    rhyme: '不强制押韵，但注意语言的音乐性和节奏感。可以使用内韵、头韵等手法增加韵律感。',
    example: '再别康桥（徐志摩）\n轻轻的我走了，\n正如我轻轻的来；\n我轻轻的招手，\n作别西天的云彩。',
    tips: '自由体诗虽然形式自由，但更注重意象的营造和情感的真挚。注意语言的凝练和画面感。'
  }
]

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('poetry_current_user')) || null
  } catch { return null }
}

function loadFavorites(username) {
  try {
    return JSON.parse(localStorage.getItem(`poetry_fav_${username}`)) || []
  } catch { return [] }
}

function saveFavorites(username, favs) {
  localStorage.setItem(`poetry_fav_${username}`, JSON.stringify(favs))
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem('poetry_users')) || []
  } catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem('poetry_users', JSON.stringify(users))
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [poetryData, setPoetryData] = useState(fallbackPoetry)
  const [filteredPoetry, setFilteredPoetry] = useState(fallbackPoetry)
  const [selectedPoem, setSelectedPoem] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedType, setSelectedType] = useState(null)
  const [createTitle, setCreateTitle] = useState('')
  const [createAuthor, setCreateAuthor] = useState('')
  const [createContent, setCreateContent] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [inspiration, setInspiration] = useState('')
  const [generatedPoems, setGeneratedPoems] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [createMode, setCreateMode] = useState('ai')
  const [selectedGenerated, setSelectedGenerated] = useState(null)

  const [currentUser, setCurrentUser] = useState(loadUser)
  const [favorites, setFavorites] = useState([])
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [profileTab, setProfileTab] = useState('favorites')
  const [favToast, setFavToast] = useState('')

  useEffect(() => {
    if (currentUser) {
      setFavorites(loadFavorites(currentUser.username))
    } else {
      setFavorites([])
    }
  }, [currentUser])

  useEffect(() => {
    const fetchPoetry = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/poetry')
        const data = await response.json()
        setPoetryData(data)
        setFilteredPoetry(data)
      } catch (error) {
        console.error('获取古诗数据失败，使用本地数据:', error)
      }
    }
    fetchPoetry()
  }, [])

  const isFavorited = useCallback((poemId) => {
    return favorites.some(f => f.id === poemId)
  }, [favorites])

  const showToast = (msg) => {
    setFavToast(msg)
    setTimeout(() => setFavToast(''), 2000)
  }

  const toggleFavorite = (poem) => {
    if (!currentUser) {
      setCurrentPage('profile')
      setSelectedPoem(null)
      window.scrollTo(0, 0)
      return
    }
    let updated
    if (isFavorited(poem.id)) {
      updated = favorites.filter(f => f.id !== poem.id)
      showToast('已取消收藏')
    } else {
      updated = [...favorites, { ...poem, favType: 'library', favTime: Date.now() }]
      showToast('已收藏')
    }
    setFavorites(updated)
    saveFavorites(currentUser.username, updated)
  }

  const saveCreation = (poem, typeName) => {
    if (!currentUser) {
      setCurrentPage('profile')
      setSelectedPoem(null)
      window.scrollTo(0, 0)
      return
    }
    const item = {
      id: `creation_${Date.now()}`,
      title: poem.title,
      author: poem.author || '佚名',
      content: poem.content,
      typeName: typeName || '',
      favType: 'creation',
      favTime: Date.now()
    }
    const updated = [item, ...favorites]
    setFavorites(updated)
    saveFavorites(currentUser.username, updated)
    showToast('创作已保存到收藏')
  }

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id)
    setFavorites(updated)
    saveFavorites(currentUser.username, updated)
    showToast('已取消收藏')
  }

  const handleLogin = () => {
    setLoginError('')
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('请输入用户名和密码')
      return
    }
    const users = loadUsers()
    if (isRegister) {
      if (users.find(u => u.username === loginUsername.trim())) {
        setLoginError('用户名已存在')
        return
      }
      const newUser = { username: loginUsername.trim(), password: loginPassword.trim() }
      users.push(newUser)
      saveUsers(users)
      setCurrentUser(newUser)
      localStorage.setItem('poetry_current_user', JSON.stringify(newUser))
      setLoginUsername('')
      setLoginPassword('')
      setLoginError('')
    } else {
      const user = users.find(u => u.username === loginUsername.trim() && u.password === loginPassword.trim())
      if (!user) {
        setLoginError('用户名或密码错误')
        return
      }
      setCurrentUser(user)
      localStorage.setItem('poetry_current_user', JSON.stringify(user))
      setLoginUsername('')
      setLoginPassword('')
      setLoginError('')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('poetry_current_user')
    setCurrentPage('home')
    setSelectedPoem(null)
    window.scrollTo(0, 0)
  }

  const splitSentences = (content) => {
    const segments = content.split(/([。？！；])/)
    const lines = []
    for (let i = 0; i < segments.length - 1; i += 2) {
      const text = segments[i].trim()
      const punct = segments[i + 1]
      if (text) lines.push(text + punct)
    }
    if (segments.length % 2 === 1 && segments[segments.length - 1].trim()) {
      lines.push(segments[segments.length - 1].trim())
    }
    return lines
  }

  const formatForCard = (content) => {
    const lines = splitSentences(content)
    const displayLines = lines.slice(0, 4)
    return displayLines.map((line, index) => (
      <span key={index} className="poetry-line">{line}</span>
    ))
  }

  const isProse = (content) => content.length > 150

  const formatForDetail = (content) => {
    if (isProse(content)) {
      return <p className="prose-paragraph">{content}</p>
    }
    const lines = splitSentences(content)
    return lines.map((line, index) => (
      <span key={index} className="poetry-line">{line}</span>
    ))
  }

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term === '') {
      setFilteredPoetry(poetryData)
    } else {
      const filtered = poetryData.filter(poem =>
        poem.title.toLowerCase().includes(term.toLowerCase()) ||
        poem.author.toLowerCase().includes(term.toLowerCase()) ||
        poem.content.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredPoetry(filtered)
    }
  }

  const handleCardClick = (poem) => {
    setSelectedPoem(poem)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setSelectedPoem(null)
  }

  const handleNavClick = (page) => {
    setCurrentPage(page)
    setSelectedPoem(null)
    setSelectedType(null)
    setShowResult(false)
    setCreateTitle('')
    setCreateAuthor('')
    setCreateContent('')
    setInspiration('')
    setGeneratedPoems([])
    setSelectedGenerated(null)
    setCreateMode('ai')
    setLoginError('')
    setProfileTab('favorites')
    window.scrollTo(0, 0)
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setShowResult(false)
    setCreateContent('')
    setGeneratedPoems([])
    setSelectedGenerated(null)
  }

  const handleCreate = () => {
    if (createContent.trim()) {
      setShowResult(true)
    }
  }

  const handleGenerate = async () => {
    if (!inspiration.trim() || !selectedType) return
    setIsGenerating(true)
    setGeneratedPoems([])
    setSelectedGenerated(null)
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType.name,
          content: inspiration,
          author: createAuthor
        })
      })
      const data = await response.json()
      setGeneratedPoems(data.poems || [])
    } catch (error) {
      console.error('生成诗词失败:', error)
      setGeneratedPoems([{ title: '生成失败', content: '请确保后端服务正在运行，然后重试。', theme: 'error' }])
    }
    setIsGenerating(false)
  }

  const handleReset = () => {
    setCreateTitle('')
    setCreateAuthor('')
    setCreateContent('')
    setShowResult(false)
    setInspiration('')
    setGeneratedPoems([])
    setSelectedGenerated(null)
  }

  const getPlaceholder = () => {
    if (!selectedType) return '请先选择诗词类型...'
    if (selectedType.key === 'ci') return '请按照词牌格律填写...'
    if (selectedType.key === 'free_verse') return '自由发挥，写下你的诗句...'
    const lineCount = selectedType.key.includes('lvshi') ? 8 : 4
    return `共${lineCount}句，每句开始换行输入...`
  }

  const formatTime = (ts) => {
    if (!ts) return ''
    const d = new Date(ts)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const renderNavBar = () => (
    <nav className="nav-bar">
      <div className="nav-brand" onClick={() => handleNavClick('home')}>古诗词</div>
      <div className="nav-links">
        <button
          className={`nav-link ${currentPage === 'home' && !selectedPoem ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          首页
        </button>
        <button
          className={`nav-link ${currentPage === 'create' ? 'active' : ''}`}
          onClick={() => handleNavClick('create')}
        >
          创作
        </button>
        <button
          className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
          onClick={() => handleNavClick('profile')}
        >
          {currentUser ? '我的' : '登录'}
        </button>
      </div>
    </nav>
  )

  const renderFavToast = () => {
    if (!favToast) return null
    return <div className="fav-toast">{favToast}</div>
  }

  if (selectedPoem) {
    const prose = isProse(selectedPoem.content)
    const fav = isFavorited(selectedPoem.id)
    return (
      <div className="app">
        {renderNavBar()}
        {renderFavToast()}
        <button className="back-btn" onClick={handleBack}>← 返回列表</button>
        <div className="detail-page">
          <div className="detail-header">
            <div>
              <h1 className="detail-title">{selectedPoem.title}</h1>
              <p className="detail-author">—— {selectedPoem.author}</p>
            </div>
            <button
              className={`fav-btn ${fav ? 'fav-active' : ''}`}
              onClick={() => toggleFavorite(selectedPoem)}
              title={fav ? '取消收藏' : '收藏'}
            >
              {fav ? '★ 已收藏' : '☆ 收藏'}
            </button>
          </div>
          <div className={prose ? 'detail-content prose' : 'detail-content poem'}>
            {formatForDetail(selectedPoem.content)}
          </div>
          {selectedPoem.background && (
            <div className="detail-section">
              <h3>创作背景</h3>
              <p>{selectedPoem.background}</p>
            </div>
          )}
          {selectedPoem.poetStory && (
            <div className="detail-section poet-story">
              <h3>诗人故事</h3>
              <p>{selectedPoem.poetStory}</p>
            </div>
          )}
          {selectedPoem.translation && (
            <div className="detail-translation">
              <h3>译文</h3>
              <p>{selectedPoem.translation}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentPage === 'profile') {
    return (
      <div className="app">
        {renderNavBar()}
        {renderFavToast()}

        {!currentUser ? (
          <div className="login-page">
            <div className="login-card">
              <h2 className="login-title">{isRegister ? '注册账号' : '用户登录'}</h2>
              <div className="login-form">
                <div className="form-group">
                  <label>用户名</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="请输入用户名..."
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <div className="form-group">
                  <label>密码</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="请输入密码..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                {loginError && <p className="login-error">{loginError}</p>}
                <div className="form-actions">
                  <button className="btn btn-primary" onClick={handleLogin}>
                    {isRegister ? '注册' : '登录'}
                  </button>
                </div>
                <p className="login-switch">
                  {isRegister ? '已有账号？' : '没有账号？'}
                  <button className="link-btn" onClick={() => { setIsRegister(!isRegister); setLoginError(''); }}>
                    {isRegister ? '去登录' : '去注册'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-page">
            <div className="profile-header">
              <div className="profile-avatar">{currentUser.username[0].toUpperCase()}</div>
              <div className="profile-info">
                <h2>{currentUser.username}</h2>
                <p>收藏 {favorites.filter(f => f.favType === 'library').length} 首诗词 · 创作 {favorites.filter(f => f.favType === 'creation').length} 首</p>
              </div>
              <button className="btn btn-secondary logout-btn" onClick={handleLogout}>退出登录</button>
            </div>

            <div className="profile-tabs">
              <button
                className={`profile-tab ${profileTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setProfileTab('favorites')}
              >
                收藏诗词
              </button>
              <button
                className={`profile-tab ${profileTab === 'creations' ? 'active' : ''}`}
                onClick={() => setProfileTab('creations')}
              >
                我的创作
              </button>
            </div>

            <div className="profile-content">
              {profileTab === 'favorites' ? (
                favorites.filter(f => f.favType === 'library').length === 0 ? (
                  <div className="empty-state">
                    <p>还没有收藏诗词</p>
                    <button className="btn btn-primary" onClick={() => handleNavClick('home')}>去首页看看</button>
                  </div>
                ) : (
                  <div className="fav-list">
                    {favorites.filter(f => f.favType === 'library').map((poem) => (
                      <div key={poem.id} className="fav-card" onClick={() => { setSelectedPoem(poem); setCurrentPage('home'); window.scrollTo(0, 0); }}>
                        <div className="fav-card-main">
                          <h3 className="fav-card-title">{poem.title}</h3>
                          <p className="fav-card-author">{poem.author}</p>
                          <div className="fav-card-content">
                            {formatForCard(poem.content)}
                          </div>
                        </div>
                        <button
                          className="fav-remove-btn"
                          onClick={(e) => { e.stopPropagation(); removeFavorite(poem.id); }}
                          title="取消收藏"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                favorites.filter(f => f.favType === 'creation').length === 0 ? (
                  <div className="empty-state">
                    <p>还没有创作诗词</p>
                    <button className="btn btn-primary" onClick={() => handleNavClick('create')}>去创作一首</button>
                  </div>
                ) : (
                  <div className="fav-list">
                    {favorites.filter(f => f.favType === 'creation').map((poem) => (
                      <div key={poem.id} className="fav-card creation-card">
                        <div className="fav-card-main">
                          <h3 className="fav-card-title">{poem.title}</h3>
                          <p className="fav-card-author">—— {poem.author}</p>
                          <div className="fav-card-content creation-content">
                            {poem.content.split('\n').filter(l => l.trim()).map((line, i) => (
                              <span key={i} className="poetry-line">{line}</span>
                            ))}
                          </div>
                          <div className="fav-card-meta">
                            {poem.typeName && <span className="result-tag">{poem.typeName}</span>}
                            <span className="fav-time">{formatTime(poem.favTime)}</span>
                          </div>
                        </div>
                        <button
                          className="fav-remove-btn"
                          onClick={(e) => { e.stopPropagation(); removeFavorite(poem.id); }}
                          title="删除"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            <footer className="footer">
              <p>© 2026 古诗APP - 传承中华文化</p>
            </footer>
          </div>
        )}
      </div>
    )
  }

  if (currentPage === 'create') {
    return (
      <div className="app">
        {renderNavBar()}
        {renderFavToast()}
        <header className="header">
          <h1>诗词创作</h1>
          <p>发挥你的想象力，创作属于你的诗词</p>
        </header>

        <section className="create-section">
          <h2 className="section-title">选择诗词类型</h2>
          <div className="type-grid">
            {poetryTypes.map(type => (
              <div
                key={type.key}
                className={`type-card ${selectedType?.key === type.key ? 'selected' : ''}`}
                onClick={() => handleTypeSelect(type)}
              >
                <h3 className="type-name">{type.name}</h3>
                <p className="type-desc">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {selectedType && (
          <section className="create-guide">
            <div className="guide-card">
              <h2 className="guide-title">{selectedType.name} · 格律指南</h2>
              <div className="guide-section">
                <h4>基本格式</h4>
                <pre className="guide-structure">{selectedType.structure}</pre>
              </div>
              <div className="guide-section">
                <h4>押韵规则</h4>
                <p>{selectedType.rhyme}</p>
              </div>
              <div className="guide-section">
                <h4>示例</h4>
                <pre className="guide-example">{selectedType.example}</pre>
              </div>
              <div className="guide-section">
                <h4>创作提示</h4>
                <p>{selectedType.tips}</p>
              </div>
            </div>

            <div className="mode-switch">
              <button
                className={`mode-btn ${createMode === 'ai' ? 'active' : ''}`}
                onClick={() => { setCreateMode('ai'); setShowResult(false); setGeneratedPoems([]); setSelectedGenerated(null); }}
              >
                智能生成
              </button>
              <button
                className={`mode-btn ${createMode === 'manual' ? 'active' : ''}`}
                onClick={() => { setCreateMode('manual'); setShowResult(false); setGeneratedPoems([]); setSelectedGenerated(null); }}
              >
                手动创作
              </button>
            </div>

            {createMode === 'ai' ? (
              <>
                {!selectedGenerated ? (
                  <div className="create-form">
                    <h2 className="form-title">输入你的灵感</h2>
                    <p className="form-subtitle">写下你想表达的意境或情感，AI 会为你生成 3 首风格相似的诗词</p>
                    <div className="form-row">
                      <div className="form-group">
                        <label>作者笔名（可选）</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="你的笔名..."
                          value={createAuthor}
                          onChange={(e) => setCreateAuthor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>灵感描述</label>
                      <textarea
                        className="form-textarea inspiration-textarea"
                        placeholder="例如：秋天的夜晚，独自在异乡看着月亮，想念远方的家乡和亲人..."
                        value={inspiration}
                        onChange={(e) => setInspiration(e.target.value)}
                        rows={5}
                      />
                    </div>
                    <div className="form-actions">
                      <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={isGenerating || !inspiration.trim()}
                      >
                        {isGenerating ? '正在生成...' : '开始生成'}
                      </button>
                      <button className="btn btn-secondary" onClick={handleReset}>清空重写</button>
                    </div>

                    {generatedPoems.length > 0 && (
                      <div className="generated-list">
                        <h2 className="form-title">为你生成的诗词</h2>
                        <p className="form-subtitle">点击选择一首你喜欢的</p>
                        <div className="generated-grid">
                          {generatedPoems.map((poem, index) => (
                            <div
                              key={index}
                              className="generated-card"
                              onClick={() => setSelectedGenerated({ ...poem, author: createAuthor || '佚名' })}
                            >
                              <h3 className="generated-title">{poem.title}</h3>
                              <div className="generated-content">
                                {poem.content.split('\n').filter(l => l.trim()).map((line, i) => (
                                  <span key={i} className="poetry-line">{line}</span>
                                ))}
                              </div>
                              <span className="generated-theme">{poem.theme}</span>
                            </div>
                          ))}
                        </div>
                        <div className="form-actions">
                          <button className="btn btn-secondary" onClick={handleGenerate} disabled={isGenerating}>
                            {isGenerating ? '生成中...' : '换一批'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="create-result">
                    <div className="result-card">
                      <h2 className="result-title">{selectedGenerated.title}</h2>
                      <p className="result-author">—— {selectedGenerated.author}</p>
                      <div className="result-content">
                        {selectedGenerated.content.split('\n').filter(l => l.trim()).map((line, index) => (
                          <span key={index} className="poetry-line">{line}</span>
                        ))}
                      </div>
                      <div className="result-type">
                        <span className="result-tag">{selectedType.name}</span>
                        <span className="result-tag result-theme">{selectedGenerated.theme}</span>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={() => setSelectedGenerated(null)}>返回选择</button>
                      <button className="btn btn-secondary" onClick={() => saveCreation({ title: selectedGenerated.title, author: selectedGenerated.author, content: selectedGenerated.content }, selectedType.name)}>
                        收藏创作
                      </button>
                      <button className="btn btn-secondary" onClick={handleReset}>重新创作</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {!showResult ? (
                  <div className="create-form">
                    <h2 className="form-title">开始创作</h2>
                    <div className="form-row">
                      <div className="form-group">
                        <label>题目</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="给你的作品取个名字..."
                          value={createTitle}
                          onChange={(e) => setCreateTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>作者</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="你的笔名..."
                          value={createAuthor}
                          onChange={(e) => setCreateAuthor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>正文</label>
                      <textarea
                        className="form-textarea"
                        placeholder={getPlaceholder()}
                        value={createContent}
                        onChange={(e) => setCreateContent(e.target.value)}
                        rows={10}
                      />
                    </div>
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={handleCreate}>完成创作</button>
                      <button className="btn btn-secondary" onClick={handleReset}>清空重写</button>
                    </div>
                  </div>
                ) : (
                  <div className="create-result">
                    <div className="result-card">
                      <h2 className="result-title">{createTitle || '无题'}</h2>
                      {createAuthor && <p className="result-author">—— {createAuthor}</p>}
                      <div className="result-content">
                        {createContent.split('\n').filter(line => line.trim()).map((line, index) => (
                          <span key={index} className="poetry-line">{line}</span>
                        ))}
                      </div>
                      <div className="result-type">
                        <span className="result-tag">{selectedType.name}</span>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={() => setShowResult(false)}>返回修改</button>
                      <button className="btn btn-secondary" onClick={() => saveCreation({ title: createTitle || '无题', author: createAuthor || '佚名', content: createContent }, selectedType.name)}>
                        收藏创作
                      </button>
                      <button className="btn btn-secondary" onClick={handleReset}>重新创作</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        <footer className="footer">
          <p>© 2026 古诗APP - 传承中华文化</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="app">
      {renderNavBar()}
      {renderFavToast()}
      <header className="header">
        <h1>古诗赏析</h1>
        <p>感受中华文化的博大精深</p>
      </header>

      <section className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="搜索古诗、作者..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </section>

      <section className="poetry-container">
        {filteredPoetry.map(poem => (
          <div
            key={poem.id}
            className="poetry-card"
            onClick={() => handleCardClick(poem)}
          >
            <h2 className="poetry-title">{poem.title}</h2>
            <p className="poetry-author">{poem.author}</p>
            <div className="poetry-content">{formatForCard(poem.content)}</div>
            {poem.content.length > 60 && (
              <p className="read-more">点击查看全文 →</p>
            )}
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>© 2026 古诗APP - 传承中华文化</p>
      </footer>
    </div>
  )
}

export default App