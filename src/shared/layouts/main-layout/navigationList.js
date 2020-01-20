import React from 'react';
import { contains, compose } from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';

import { withTranslate } from '../../components/translate';
import { AuthorizeComponent } from '../../components/authorizeRoute';
import { WithRbac } from 'common/rbac';

const useStyles = makeStyles(theme => ({
  backgroundColor: {
    backgroundColor: theme.palette.grey[200],
  },
}));

const MenuButton = compose(
  withTranslate,
  withRouter
)(({ title, icon: Icon, pagePath, exact, ...props }) => {
  const { pathname } = props.location;
  return (
    <ListItem
      button
      key={title}
      selected={exact ? pagePath === pathname : contains(pagePath, pathname)}
      onClick={() => props.history.push(pagePath)}
    >
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={props.translate(title)} />
    </ListItem>
  )
})

const MenuButtonWithChild = withTranslate(({ title, icon: Icon, childs, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem
        button
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon><Icon /></ListItemIcon>
        <ListItemText primary={props.translate(title)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.backgroundColor}>
          <MenuList menuItems={childs} />
        </div>
      </Collapse>
    </React.Fragment>
  )
})

const MenuButtonSwitcher = (props) => {
  if (props.childs) {
    return <MenuButtonWithChild {...props} />
  }
  return <MenuButton {...props} />
}

export const MenuList = ({ menuItems }) => {
  return (
    <List disablePadding>
      {
        menuItems
          .map(({ allowedRoles, ...props }, index) => (
            <WithRbac
              key={props.title}
              action={allowedRoles}
            >
              <MenuButtonSwitcher {...props} />
            </WithRbac>
          ))
      }
    </List>
  )
}