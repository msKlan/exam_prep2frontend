import React, {useState} from 'react';
import Select from 'react-select';
// import {useRouteMatch, Route, Link, Switch} from 'react-router-dom';

import './App.css';

function Jokes(props) {
  const {items, getItems} = props;

  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState([]);

  const categories = [
    {label: 'career', value: 1},
    {label: 'celebrity', value: 2},
    {label: 'dev', value: 3},
    {label: 'explicit', value: 4},
    {label: 'fashion', value: 5},
    {label: 'food', value: 6},
    {label: 'history', value: 7},
    {label: 'money', value: 8},
    {label: 'movie', value: 9},
    {label: 'music', value: 10},
    {label: 'political', value: 11},
    {label: 'science', value: 12},
    {label: 'sport', value: 13},
    {label: 'travel', value: 14},
  ];

  const onChangeCheckbox = e => {
    const isChecked = !checked;
    setChecked(isChecked);
    setSelected(isChecked ? categories : setSelected);
  };
  const onChange = opt => {
    const allOptionsSelected = opt.length === categories.length;
    setSelected(opt);
    setSelected(opt);
    setChecked(allOptionsSelected ? true : false);
    console.log('opt', opt);
    console.log('sel', selected);
    if (selected.length > 4) {
      alert('Max 4 categories when in demo');
    }
  };

  const getItemsClick = () => {
    // console.log('click', selected);
    getItems(selected.map(c => c.label).toString());
  };

  return (
    <div>
      <h2>Jokes</h2>
      <Select isMulti onChange={onChange} options={categories} value={selected} />
      <p>
        <input onChange={onChangeCheckbox} type="checkbox" id="selectAll" value="selectAll" checked={checked} />
        <label htmlFor="selectAll">Select all</label>
      </p>

      <br />
      <button onClick={getItemsClick}>Get jokes</button>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.categories}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jokes;
