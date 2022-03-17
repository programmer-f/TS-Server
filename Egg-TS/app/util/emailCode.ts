const nodemailer = require('nodemailer');

let transporter;
export default {
  //1.创建发送者对象
  createTransporterInstance(ctx) {
    if (transporter) {
      return transporter;
    } else {
      transporter = nodemailer.createTransport({
        host: ctx.app.config.smtp.host,
        port: ctx.app.config.smtp.port,
        secure: true, // true for 465, false for other ports
        auth: {
          user: ctx.app.config.smtp.user, // 发送邮件的邮箱
          pass: ctx.app.config.smtp.pass, // 邮箱对应的授权码
        },
      });
      return transporter;
    }
  },
  //2.创建发送内容
  createEmailInfo(ctx, to: string) {
    //1.生成验证码
    let code = Math.random().toString(16).slice(2, 6).toUpperCase();
    //2.生成发送内容
    let info = {
      from: '18291994396@163.com', // 谁发的
      to: to, // 发给谁
      subject: '方剑鹏管理后台验证码', // 邮件标题
      text: `您正在注册方剑鹏管理后台，验证码是:${code}`, // 邮件内容
    };
    //3.保存验证码
    ctx.session.email = {
      code: code,
      expire: Date.now() + 60 * 1000, //验证码在1分钟之后过期
    };
    //4.返回验证码
    return info;
  },
  //3.发送邮件
  async sendEmailCode(ctx, to: string) {
    const transporter = this.createTransporterInstance(ctx);
    const info = this.createEmailInfo(ctx, to);
    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  //校验邮箱验证码
  verifyEmailCode(ctx, clientCode) {
    //1.取出服务端中保存的验证码和过期时间
    const serverCaptcha = ctx.session.email;
    let serverCode;
    let serverExpire;
    try {
      serverCode = serverCaptcha.code;
      serverExpire = serverCaptcha.expire;
    } catch (e) {
      ctx.session.email = null;
      throw new Error('请重新获取验证码');
    }
    //如果验证码存在，则去校验
    if (Date.now() > serverExpire) {
      ctx.session.email = null;
      throw new Error('验证码已经过期');
    } else if (serverCode !== clientCode) {
      ctx.session.email = null;
      throw new Error('验证码不正确');
    }
    //清空验证码(不管校验通过还是没通过，一个验证码只能用一次)
    ctx.session.email = null;
  },
};
