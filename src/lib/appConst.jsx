export default Object.freeze({
  SCREEN: {
    HOME     : 0,
    REGISTER : 1
  },

  URL: {
    INDEX        : "/",
    HOME         : "/home",
    TEMPLATE_INPUT   : "/template-input",
    SEARCH       : "/search",
    TEMPLATE_SHOW    : "/template-show",
  },

  API: {
    FETCH_URL :"/api/fetch-url"
  },

  TEMPLATE_INPUT_TAB: {
    GATHERING  : "情報収集",
    PLAN       : "行動計画",
    EVALUATION : "評価",
  },

  REGISTER_DATA: {
    DATE     : "memo_date",
    MEMO     : "memo",
    CATEGORY : "category_id"
  },

  SEARCH_DATA: {
    DATE_FROM  : "date_from",
    DATE_TO    : "date_to",
    KEYWORD    : "keyword",
    CATEGORY   : "category"
  },

  CATEGORY_DEFAULT: {
    KEY   : 0,
    VALUE : "メモ"
  },

  SCREEN_TITLE: {
    REGISTER : "メモ登録",
    CALENDAR : "カレンダー"
  },

  BUTTON_TITLE: {
    REGISTER : "登録"
  },
  
  HTTP_METHOD: {
    GET     : "GET",
    POST    : "POST",
    PUT     : "PUT",
    DELETE  : "DELETE",
  },

  ACTION_TYPE: {
    SET_USER : "SET_USER",
  },
});