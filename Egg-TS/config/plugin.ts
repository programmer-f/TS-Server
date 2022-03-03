import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
    // 开启sequelize
    // sequelize : {
    //     enable: true,
    //     package: 'egg-sequelize',
    // }
    // 开启sequelize-typescript
    sequelize : {
        enable: true,
        package: 'egg-sequelize-ts',
    }
};

export default plugin;
