import React, { ChangeEvent } from 'react';
import { alphabetFilters } from '../../../data/utils';
import { IToys } from '../../../ts-files/interfaces';
import styles from './../toys.style.module.css';

type TFiltersByAlphabet = {
  setSortSelection: (state: string) => void;
  setItems: (state: IToys[] | ((state: IToys[]) => IToys[])) => void;
};

export default function FiltersByAlphabet({ setItems, setSortSelection }: TFiltersByAlphabet) {
  function updateState(e: ChangeEvent<HTMLSelectElement>) {
    const sortFilter = e.target.value;
    setSortSelection(sortFilter);
    setItems((prev) => alphabetFilters(prev, sortFilter));
  }
  return (
    <>
      <h4 className={styles.item__title}>СОРТИРОВКА</h4>
      <select onChange={updateState} className={styles.item__select}>
        <option value={'а-я'} className={styles.item__option}>
          По названию от «А» до «Я»
        </option>
        <option value={'я-а'} className={styles.item__option}>
          По названию от «Я» до «А»
        </option>
        <option value={'top'} className={styles.item__option}>
          По году приобретения по возрастанию
        </option>
        <option value={'bot'} className={styles.item__option}>
          По году приобретения по убыванию
        </option>
      </select>
      <button onClick={() => localStorage.clear()} className={styles.item__button_reset}>
        Очистить localStorage
      </button>
    </>
  );
}
