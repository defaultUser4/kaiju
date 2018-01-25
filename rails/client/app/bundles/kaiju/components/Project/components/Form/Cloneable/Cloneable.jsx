import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { duplicateProperty, refresh } from '../../../utilities/messenger';
import axios from '../../../../../utilities/axios';
import './Cloneable.scss';

const propTypes = {
  /**
   * Child form
   */
  children: PropTypes.node,
  /**
   * The Component identifier
   */
  componentId: PropTypes.string,
};

const Cloneable = ({ children, componentId, ...property }) => {
  /**
   * TODO: Fix
   * This is a temporary workaround to prevent duplicate actions found in the Child form component
   */
  if (property.type === 'Component') {
    return children;
  }

  const duplicate = () => {
    duplicateProperty(componentId, property);
  };

  /**
   * TODO: Move this functionality into the Component dispatcher
   */
  const deleteProperty = () => {
    axios
      .delete(property.url)
      .then(() => {
        refresh(componentId);
      });
  };

  return (
    <div className="kaiju-Cloneable">
      <div className="kaiju-Cloneable-actions">
        <div className="kaiju-Cloneable-action" role="presentation" onClick={duplicate}>
          <Icon type="copy" />
        </div>
        <div className="kaiju-Cloneable-action" role="presentation" onClick={deleteProperty}>
          <Icon type="delete" />
        </div>
      </div>
      {children}
    </div>
  );
};

Cloneable.propTypes = propTypes;

export default Cloneable;
