import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function Dev({ dev, handleRemove }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev?.avatar_url} alt={dev?.name} />
        <div className="user-info">
          <strong>{dev?.name}</strong>
          <span>{dev?.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev?.bio}</p>
      <div>
        <a href={`https://github.com/${dev?.github_username}`}>
          Acessar perfil no github
        </a>

        <button onClick={() => handleRemove(dev._id)}>
          Remover
        </button>
      </div>
    </li>
  );
}

Dev.propTypes = {
  dev: PropTypes.shape().isRequired,
  handleRemove: PropTypes.func.isRequired,
};
