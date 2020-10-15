import React from 'react';
import Box from '@material-ui/core/Box';
import Sorter from "@comp/sorter";
import TemplateCard from "@comp/templateCard";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    marginTop: theme.spacing(2),
  },
}));


export default function MenuListComposition() {
  const classes = useStyles();
  const compProps = {
    gridItem: {
      item         : true,
      space        : 5,
      xs           : 12,
      md           : 6,
      lg           : 4,
      className    : classes.gridItem
    }
  }

  /**
   * テンプレートリスト
   */
  const templateList = [
    {
      template_title : "テンプレート",
      template_id    : 1,
    },
  ];

  return (
    <Box mx={10} mt={4}>
      <Box display="flex" alignItems="center">
        <h2>テンプレート</h2>
        <Sorter />
      </Box>
      <Grid container spacing={1}>
        {templateList.map(item =>
          <Grid {...compProps.gridItem} key={item.template_id}>
            <TemplateCard templateTitle={item.template_title} templateId={item.template_id} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
