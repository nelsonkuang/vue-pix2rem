/**
 * 获取url传值
 *
 * @param {String} name
 * @return {String}
 */
export const getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 添加cookie
 *
 * @param {String} name
 * @param {String} value
 * @param {Number} expireHours
 */
export const addCookie = function (name, value, expireHours) {
  var cookieString = name + "=" + escape(value) + "; path=/";
  // 判断是否设置过期时间
  if (expireHours > 0) {
    var date = new Date();
    date.setTime(date.getTime + expireHours * 3600 * 1000);
    cookieString = cookieString + "; expire=" + date.toGMTString();
  }
  document.cookie = cookieString;
}

/**
 * 获取cookie
 *
 * @param {String} name
 * @return {String}
 */
export const getCookie = function (name) {
  var strcookie = document.cookie;
  var arrcookie = strcookie.split("; ");
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name) return arr[1];
  }
  return "";
}

/**
 * 删除cookie
 *
 * @param {String} name
 */
export const delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getcookie(name);
  if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

/**
 * 手机号码判断
 *
 * @param {String} val
 * @return {Boolean}
 */
export const isMobileNumber = function (val) {
  if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(val))) {
    return false;
  } else {
    return true;
  }
}
/**
 * 返回上一层
 */
export const goBack = function () {
  window.history.go(-1);
}

/**
 * 判断是否为身份证
 * 来源于网络
 *
 * @param {String} num
 * @return {Boolean}
 */
export const isIdCardNo = function (num) {
  var num = num.toUpperCase(),
    len = num.length,
    re;
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    return false;
  } else {
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      splitArr = num.match(re);
      // 检查生日日期是否正确 如19850843 或者 20000843
      var dtmBirth = new Date('19' + splitArr[2] + '/' + splitArr[3] + '/' + splitArr[4]);
      if (!((dtmBirth.getYear() == Number(splitArr[2])) && ((dtmBirth.getMonth() + 1) == Number(splitArr[3])) && (dtmBirth.getDate() == Number(splitArr[4])))) {
        // alert('输入的身份证号里出生日期不对！');
        return false;
      } else {
        return true;
      }
    } else if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var splitArr = num.match(re);
      var dtmBirth = new Date(splitArr[2] + "/" + splitArr[3] + "/" + splitArr[4]);
      if (!((dtmBirth.getFullYear() == Number(splitArr[2])) && ((dtmBirth.getMonth() + 1) == Number(splitArr[3])) && (dtmBirth.getDate() == Number(splitArr[4])))) {
        // alert('输入的身份证号里出生日期不对！');
        return false;
      }
      // 检验18位身份证的校验码是否正确。
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var checkNum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0,
        i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      checkNum = arrCh[nTemp % 11];
      if (checkNum != num.substr(17, 1)) {
        // alert('18位身份证的校验码不正确！应该为：' + checkNum);
        return false;
      } else {
        return true;
      }
    }

  }
}

/**
 * 判断是否为2~15字姓名
 *
 * @param {String} name
 * @return {Boolean}
 */
export const isChineseName = function (name) {
  reg = /^[\u4E00-\u9FA5]{2,15}$/;
  if (!reg.test(name)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 预加载图片
 *
 * @param {String|Array} urls
 */
export const preLoadImages = function (urls) { // 可以是String Array或者String
  var argsLen = arguments.length,
    loadImage = function (url) {
      var img = new Image();
      img.src = url;
    };
  if (argsLen == 1) {
    if (typeof (urls) == "string" && (sLen = urls.length) > 1) { // 预加载一个图片
      loadImage(urls);
    } else if (Object.prototype.toString.call(arguments[0]) == "[object Array]" && urls.length > 0) { // 预加载多个图片
      for (var i = 0; i < urls.length; i++) {
        loadImage(urls[i]);
      }
    }
  }
}

/**
 * input输入框特殊字符过滤
 * @param {HTMLInputElement} input
 */
export const filtInputValue = function (input) {
  var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘’\"；：”“'。，、？]"); // 格式 RegExp("[在中间定义特殊过滤字符]")
  var s = input.value;
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  input.value = rs;
}

/**
 * 对象拷贝
 *
 * @param {Object} target
 * @param {Object} source
 * @return {Object}
 */
export const extend = function (target, source) {
  var length = arguments.length;
  if (length == 1) {
    source = arguments[0];
    target = this;
  }
  for (var p in source) {
    if (source.hasOwnProperty(p)) {
      target[p] = source[p];
    }
  }
  return target;
}

/**
 * 回到顶部缓动效果
 * @author rid.k, optimised by Nelson 20160822
 *
 * @param {Float|undefine} acceleration
 * @param {Number|undefine} time
 */
export const goTop = function (acceleration, time) {
  acceleration = acceleration || -0.02;
  time = time || 16; // 1秒内播放60帧以上(1000 / 60 = 16.6667)肉眼就不会觉得眩晕，感觉是平滑过度
  var y1 = 0;
  var y2 = 0;
  var y3 = 0;
  if (document.documentElement) {
    y1 = document.documentElement.scrollTop || 0;
  }
  if (document.body) {
    y2 = document.body.scrollTop || 0;
  }
  y3 = window.scrollY || 0;
  // 滚动条到页面顶部的垂直距离
  var y = Math.max(y1, Math.max(y2, y3));
  // 在相同的时间，因为要距离原来越小,直到0为止，
  // Δs = vt - at^2/2  下面将采用近似法
  // v = at
  // => s = at^2/2
  // => t = Math.sqrt(-2*y/acceleration)
  // => v = acceleration * Math.sqrt(-2*y/acceleration)
  // => Δs = vΔt = acceleration * Math.sqrt(-2*y/acceleration) * time 采用近似法
  var s = acceleration * Math.sqrt(-2 * y / acceleration) * time;
  window.scrollTo(0, Math.floor(y + s));
  // 如果距离不为零, 继续调用迭代本函数
  if (y > 0) {
    var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
    window.setTimeout(invokeFunction, time);
  }
};

/**
 * 预加载图片
 *
 * @param {String|Array} urls
 * @param {Function} onFinishCallback
 * @param {Function} onProgressCallback，带进度返回onProgressCallback(progress)
 */
export const preLoadImagesWithCB = function (urls, onFinishCallback, onProgressCallback) { // urls可以是String Array或者String，后面两个是回调函数
  var loadImage = function (url, cb) {
    var img = new Image();
    img.src = url;
    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
      cb(img);
      return; // 直接返回，不用再处理onload事件
    }
    img.onload = function () { //图片下载完毕时异步调用callback函数。
      img.onload = null;
      cb(img);
      return
    };
    img.onerror = function () {
      img.onerror = null;
      cb(img);
    };
  };
  if (typeof urls == "string" && urls.length > 1) { // 预加载一个图片
    loadImage(urls, function () {
      onFinishCallback && onFinishCallback();
    });
  } else if (Object.prototype.toString.call(arguments[0]) == "[object Array]" && urls.length > 0) { // 预加载多个图片
    var length = urls.length,
      completedImgCount = 0;
    for (var i = 0; i < length; i++) {
      loadImage(urls[i], function () {
        completedImgCount++;
        onProgressCallback && onProgressCallback(completedImgCount / length);
        completedImgCount == length && onFinishCallback && onFinishCallback();
      });
    }
  }
}

// 下面引用自：https://github.com/bailicangdu/vue2-elm/blob/master/src/config/mUtils.js
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;

  document.body.addEventListener('scroll', () => {
    loadMore();
  }, false)
  //运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element, 'paddingBottom');
    marginBottom = getStyle(element, 'marginBottom');
  }, {
    passive: true
  })

  //运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore();
  }, {
    passive: true
  })

  //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {
    passive: true
  })

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        loadMore();
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
        //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight;
        loadMore();
      }
    })
  }

  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback();
    }
  }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
  let requestFram;
  let oldScrollTop;

  document.addEventListener('scroll', () => {
    showBackFun();
  }, false)
  document.addEventListener('touchstart', () => {
    showBackFun();
  }, {
    passive: true
  })

  document.addEventListener('touchmove', () => {
    showBackFun();
  }, {
    passive: true
  })

  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop;
    moveEnd();
  }, {
    passive: true
  })

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop != oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
      }
      showBackFun();
    })
  }

  //判断是否达到目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true);
    } else {
      callback(false);
    }
  }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer);

  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  } else if (duration instanceof String) {
    mode = duration;
    duration = 400;
  }

  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = 'ease-out';
  }

  //获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getStyle(element, attr, 'float') * 100);
    } else {
      return getStyle(element, attr);
    }
  }
  //根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);

  const unit = {};
  const initState = {};

  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
    } else {
      unit[attr] = 'px';
    }
    initState[attr] = attrStyle(attr);
  });

  //去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
      target[attr] = parseInt(target[attr]);
    }
  });


  let flag = true; //假设所有运动到达终点
  const remberSpeed = {}; //记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0; //步长
      let status = false; //是否仍需运动
      let iCurrent = attrStyle(attr) || 0; //当前元素属性址
      let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
          break;
        case 'linear':
          speedBase = initState[attr];
          intervalTime = duration * 20 / 400;
          break;
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
          remberSpeed[attr] = iSpeed
          break;
        default:
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = iCurrent != target[attr];
          break;
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        default:
          status = iCurrent != target[attr];
      }

      if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed;
        } else {
          element.style[attr] = iCurrent + iSpeed + 'px';
        }
      } else {
        flag = true;
      }

      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    })
  }, 20);
}


/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function preLoadImage(url, callback) { // fixed Chrome 图片load不出来问题
  let img = new Image() //创建一个Image对象，实现图片的预下载  
  img.src = url

  if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
    callback && callback.call(img)
    return // 直接返回，不用再处理onload事件  
  }

  img.onload = function () { //图片下载完毕时异步调用callback函数。  
    callback && callback.call(img) //将回调函数的this替换为Image对象  
  }
}
export function createRoundRectPath(x, y, w, h, r) { // 创建圆角矩形
  const path = new Path2D()
  path.moveTo(x + r, y)
  path.lineTo(x + w - r, y)
  path.arc(x + w - r, y + r, r, Math.PI / 180 * 270, 0, false)
  path.lineTo(x + w, y + h - r)
  path.arc(x + w - r, y + h - r, r, 0, Math.PI / 180 * 90, 0, false)
  path.lineTo(x + r, y + h)
  path.arc(x + r, y + h - r, r, Math.PI / 180 * 90, Math.PI / 180 * 180, false)
  path.lineTo(x, y + r)
  path.arc(x + r, y + r, r, Math.PI / 180 * 180, Math.PI / 180 * 270, false)
  return path
}
export function drawText(ctx,text, x, y) {
  ctx.save() // 保存画布 用save及restore是为了不影响其他地方使用画布
  ctx.font = '400 16px "Hiragino Sans GB W3","Microsoft YaHei",sans-serif'
  let gd = ctx.createLinearGradient(0, 0, 400, 0) // (x0,y0,x1,y1)
  gd.addColorStop("0", "magenta")
  gd.addColorStop("0.5", "blue")
  gd.addColorStop("1.0", "red")
  ctx.fillStyle = gd
  ctx.shadowBlur = 5 // ******调节阴影shadowBlur，shadowOffsetX，shadowOffsetY，shadowColor
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.shadowColor = "#333"
  ctx.fillText(text, x, y) // ******使用FILLTEXT
  ctx.restore() // 恢复画布
}