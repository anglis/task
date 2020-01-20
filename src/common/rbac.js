import React from 'react';
import { useSelector } from 'react-redux';

import { getUserComposedRoles } from '../selectors/user.selector';

export const canAccess = (actions, roles) => {
  if (typeof actions === 'string') {
    return roles.indexOf(actions) >= 0
  }

  return !!actions.find(action => canAccess(action, roles));
}

export const canExecute = action => (_, getState) => {
  const userRoles = getUserComposedRoles(getState());

  if (canAccess(action, userRoles)) {
    return true;
  }

  return false;
}

export const withRbacAccess = (Component, action) => props => {
  return (
    <WithRbac action={action}>
      <Component {...props} />
    </WithRbac>
  )
}

export const WithRbac = ({ action, children, fallback = null }) => {
  const userRole = useSelector(getUserComposedRoles);
  const access = canAccess(action, userRole);

  return access ? children : fallback
}