import Db from '@lib/dbConfig';
// import auth0 from '@lib/auth0';
import TemplateModel from '@model/TemplateModel';
import AppConst from '@lib/appConst';
import templateModel from '@model/templateModel';

let user = {userId: 1};

// export default auth0.requireAuthentication(async (req, res) => {
//     const session = await auth0.getSession(req);
//     user = await session.user;
export default async (req, res) => {
  if (req.method === AppConst.HTTP_METHOD.GET) {
    const type = req.query.type;

    //照会・更新画面
    if (type === AppConst.URL_QUERY_TYPE.ONE) {
      getOneTemplate(req, res);

    //一覧画面
    } else if (type === AppConst.URL_QUERY_TYPE.LIST) {
      getListTemplate(req, res);
    }

    //登録画面
  } else if (req.method === AppConst.HTTP_METHOD.POST) {
    insertTemplate(req, res);

    //更新画面
  } else if (req.method === AppConst.HTTP_METHOD.PUT) {
    updateTemplate(req, res);
  }
};

//テンプレート1つ分取得
const getOneTemplate = async (req, res) => {
  try {
    const templateId = req.query.templateId;

    //エラー終了
    if (!templateId) {
      throw new Error('Request Query templateId required.\n' +
                      `Status Code: ${AppConst.HTTP_STATUS_CODE.PRECONDITION_FAILED}`)
    }

    const result = await TemplateModel.findAll({
      where: { template_id: templateId }
    });
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

//テンプレート1つ分取得
const getListTemplate = async (req, res) => {
  try {
    const userId = user.userId;
    const sort = req.query.sort;
    //エラー終了
    if (!userId) {
      throw new Error('Request Query userId required.\n' +
                      `Status Code: ${AppConst.HTTP_STATUS_CODE.PRECONDITION_FAILED}`);
    }

    //TODO 定数の登録
    const orderBy = sort === AppConst.TEMPLATE_LIST_SORT.OLD ? "ASC" : "DESC";

    const result = await TemplateModel.findAll({
      where: { user_id: userId },
      order:[
        ["create_dtt", orderBy],
      ]
    });

    res.json(result);
  } catch(err) {
    res.send(err.message);
  }
};

//登録
const insertTemplate = async (req, res) => {
  try {
    var values = {
      user_id           : user.userId,
      category_id       : req.query.categoryId,
      template_title    : req.query.templateTitle,
      template_contents : req.query.templateContents,
      template_id       : await getMaxTemplateId() 
    }
    const result = await TemplateModel.create(values);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

//更新
const updateTemplate = async (req, res) => {
  try {
    const templateId = req.query.templateId;
    if (!templateId) {
      throw new Error('Request Query templateId required.\n' +
        `Status Code: ${AppConst.HTTP_STATUS_CODE.PRECONDITION_FAILED}`);
    }
    var values = {
      user_id           : user.userId,
      category_id       : req.query.categoryId,
      template_title    : req.query.templateTitle,
      template_contents : req.query.templateContents,
    }
    await TemplateModel.update(values, {
      where: {template_id : templateId}
    });
    const result = await templateModel.findOne({where:{template_id : templateId}})

    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

//削除
const deleteTemplate = (req, res) => {
  TemplateModel
    .destroy({
      where: { template_id: req.query.template_id }
    })
    .then(function () {
      res.json();
    }).catch(function (err) {
      res.send(err);
    })
};

/** 最大のテンプレートIDを取得する */
const getMaxTemplateId = async () => {
  const result = await TemplateModel.findOne({
    attributes: [
      [
        Db.fn("COALESCE",
          Db.fn('MAX', Db.col("template_id")),
          0),
        "max_template_id"
      ],
    ],
  });
  return await result.dataValues['max_template_id'] + 1;
}