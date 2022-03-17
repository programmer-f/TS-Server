import svgCaptcha = require('svg-captcha');

export default {
  createImageCode(ctx) {
    //1.生成验证码
    const c = svgCaptcha.create({
      size: 4, //验证码长度
      width: 160,
      height: 60,
      fontSize: 40,
      ignoreChars: 'OoAa',
      noise: 2, //干扰线条的数量
      color: true,
      background: '#ccc',
    });
    //2.保存验证码

    ctx.session.captcha = {
      code: c.text,
      expire: Date.now() + 60 * 1000, //验证码在1分钟之后过期
    };

    //3.返回验证码
    return c.data;
  },
  verifyImageCode(ctx, clientCode) {
    //1.取出服务端中保存的验证码和过期时间
    const serverCaptcha = ctx.session.captcha;
    let serverCode;
    let serverExpire;
    try {
      serverCode = serverCaptcha.code;
      serverExpire = serverCaptcha.expire;
    } catch (e) {
      ctx.session.captcha = null;
      throw new Error('请重新获取验证码');
    }
    //如果验证码存在，则去校验
    if (Date.now() > serverExpire) {
      ctx.session.captcha = null;
      throw new Error('验证码已经过期');
    } else if (serverCode !== clientCode) {
      ctx.session.captcha = null;
      throw new Error('验证码不正确');
    }
    //清空验证码(不管校验通过还是没通过，一个验证码只能用一次)
    ctx.session.captcha = null;
  },
};
