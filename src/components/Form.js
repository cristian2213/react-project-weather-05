import React, { useState } from 'react';
import PropTypes from 'prop-types';// imt

const Form = ({ quest, updateQuest, saveConsult }) => {

  // error state
  const [error, saveError] = useState(false);

  const { city, country } = quest;

  const handleChange = (e) => {
    updateQuest({
      ...quest,
      [e.target.name]: e.target.value,
    });
  }

  // form submit  
  const handleSubmit = e => {
    e.preventDefault();

    // validate form
    if (city === '' || country === '') {
      saveError(true);
      return;
    }

    saveError(false);

    // enable search
    saveConsult(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <p className="red darken-2 error">All fields are required</p> : null}

      <div className="input-field col s12">
        <input
          type="text"
          name="city"
          id="city"
          onChange={handleChange}
        />
        <label htmlFor="city">City: </label>
      </div>

      <div className="input-field col s12">
        <select
          name="country"
          id="country"
          onChange={handleChange}
        >
          <option value="">-- Select a country --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="country">Country:</label>
      </div>

      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block light-green accent-3 col s12"
        >Cosult Weather</button>
      </div>

    </form>
  );
}

Form.propTypes = {
  quest: PropTypes.object.isRequired,
  updateQuest: PropTypes.func.isRequired,
  saveConsult: PropTypes.func.isRequired
}

export default Form;