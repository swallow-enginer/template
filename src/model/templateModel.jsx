import Sequelize from 'sequelize';
import DbConfig from '@lib/dbConfig'

const templateModel = DbConfig.define('template', {
  template_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    comment: "テンプレートID"
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "ユーザーID"
  },
  template_title: {
    type: Sequelize.STRING(50),
    comment: "テンプレート名"
  },
  template_contents: {
    type: Sequelize.TEXT,
    comment: "テンプレート内容"
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "カテゴリーID"
  },
  update_dt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("current_timestamp"),
    comment: "更新日"
  },
  create_dtt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("current_timestamp"),
    comment: "作成日"
  }
}, {
  freezeTableName: true,
});

templateModel.sync();
export default templateModel;