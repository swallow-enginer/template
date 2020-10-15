import React, {useState} from 'react';
import AppBar from "@comp/appBar";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import theme from '@lib/theme';
import { useRouter } from 'next/router';
import AppConst from '@lib/appConst';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  mainContents: {
    [theme.breakpoints.up('md')]: {maxWidth: "800px",},
    [theme.breakpoints.down('sm')]: {marginLeft: "80px", marginRight: "80px",},
    margin: "auto",
    backgroundColor: theme.palette.gray.main,
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    "& > *": {
      marginBottom: theme.spacing(4),
    }
  }
}));

const templateShow = () => {
  const classes = useStyles();
  const router = useRouter();
  const snackBarMessage = "コピーしました！"

  const [pageProps, setPageProps] = useState({
    templateId: 1,
    templateTitle: "XXXXXX",
    categoryNm: "YYYYY",
    templateContents: "XXXXXXXX$(名前1)XXXXXx",
    argDataTitle: [
      "名前1",
      "名前2",
      "名前3",
    ],
    argData: {},
    snackBarOpen: false,
  });

  /** 編集ボタンクリック時の処理 */
  const editTemplate = () => {
    router.push({
      pathname: AppConst.URL.TEMPLATE_INPUT,
      query: {
        template_id : pageProps.templateId
      }
    })
  }

  /** 置換後のテンプレート取得 */
  const getReplacedTemplate = () => {
    let template = pageProps.templateContents;
    //置換処理
    if (template) {
      for (let key in pageProps.argData) {
        template = template.replace(`$(${key})`, pageProps.argData[key]);
      }
    }
    return template;
  }
  
  const compProps = {
    appBar: {
      onButtonClick:editTemplate
    },
    mainContents: {
      display:"flex",
      flexDirection:"column",
      className: classes.mainContents
    },
    argDataBox: {
      display:"flex",
      flexDirection:"column",
    },
    argDataInputBox: {
      marginBottom: theme.spacing(0.1),
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
    argDataContents: {
      fullWidth: true,
      variant: "outlined",

    },
    templateContents: {
      marginLeft: theme.spacing(0.5),
    },
    assignmentIcon: {
      marginLeft: theme.spacing(0.5),
    },
    contentsTitle: {
      fontWeight:"fontWeightBold",
      component:"span"
    },
    templateTitle: {
      fontWeight:"fontWeightBold",
      marginBottom: theme.spacing(0.5),
      display:"flex",
      flexDirection:"column",
    },
    divider: {
      light: true
    },
    copyButton: {
      variant:"contained",
      color:"primary",
      // onClick: ()=> {}
    },
    copyIcon: {
      color: "white",
      // marginRight: theme.spacing(0.5),
    },
    copySnackbar: {
      anchorOrigin:{vertical:"bottom", horizontal: "center"},
      autoHideDuration:1000,
      open:pageProps.snackBarOpen,
      onClose: () => setPageProps({...pageProps, snackBarOpen: false}),
      // open:true,
      message:snackBarMessage,
    }
  }

  const handleArgDataChange = (e, title) => {
    let result = pageProps;
    result.argData[title] = e.target.value;
    setPageProps(result)
  }

  const getArgDataInputList = () => {
    let result = [];
    for (const title of pageProps.argDataTitle) {
      result.push(
        <Box {...compProps.argDataInputBox}>
          <TextField 
            {...compProps.argDataContents}
            label={title} 
            value={pageProps.argData[title]} 
            onChange={(e) => handleArgDataChange(e, title)}
          />
        </Box>
      );
    }
    return result;
  }
  
  return (
    <>
      <AppBar {...compProps.appBar}/>
      <Box {...compProps.mainContents}>
        <Box>
          <Typography>
            <Box {...compProps.contentsTitle}>タイトル</Box>&emsp;：{pageProps.templateTitle}
          </Typography>
        </Box>

        <Box>
          <Typography>
            <Box {...compProps.contentsTitle}>カテゴリー</Box>：{pageProps.categoryNm}
          </Typography>
        </Box>
        
        <Box {...compProps.templateTitle}>
          <Box>テンプレート内容</Box>
          <Box {...compProps.templateContents}><Typography>{pageProps.templateContents}</Typography></Box>
        </Box>
        
        

        <Divider {...compProps.divider} />

        <Box {...compProps.argDataBox}>
          <Typography>
            <Box {...compProps.contentsTitle}>必要なデータ</Box>
          </Typography>
          
          {/* {pageProps.argDataTitle.forEach(title =>  */}
          {getArgDataInputList()}
        </Box>

        <CopyToClipboard text={getReplacedTemplate()} onCopy={() => setPageProps({...pageProps, snackBarOpen: true})}>
          <Button {...compProps.copyButton}>
            <AssignmentIcon {...compProps.copyIcon}/>コピー
          </Button>
        </CopyToClipboard>

      </Box>

      <Snackbar {...compProps.copySnackbar}/>
    </>
  )
}
export default templateShow;
