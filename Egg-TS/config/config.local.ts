import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // 添加sequelize配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'management_system',
  };
  //禁用CSRF校验
  config.security = {
    csrf: {
      enable: false,
    },
  };
  //邮件配置相关
  config.smtp = {
    host: 'smtp.163.com',
    port: 465,
    user: '18291994396@163.com', // 发送邮件的邮箱
    pass: 'KITIXGNTETLXKJQZ', // 邮箱对应的授权码
  };
  // 短信相关配置
  config.sms = {
    accessKeyId: 'LTAI4GHcxJrqW3gi2rUxhurB',
    secretAccessKey: 'Eq2EEg8NT9OWBVXraJdHrwvpP5sCjQ',
  };
  //添加redis配置
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
    agent: true,
  };

  return config;
};
