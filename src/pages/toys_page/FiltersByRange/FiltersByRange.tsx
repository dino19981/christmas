import Nouislider from 'nouislider-react';
import React from 'react';
import { filterItems } from '../../../data/utils';
import { IFilters, IToys } from '../../../ts-files/interfaces';
import styles from './../toys.style.module.css';

type TFiltersByRange = {
  setItems: (state: IToys[] | ((prev: IToys[]) => IToys[])) => void;
  filters: {
    filters: IFilters;
    setFilters: (state: IFilters | ((state: IFilters) => IFilters)) => void;
  };
};

export default function FiltersByRange({ setItems, filters }: TFiltersByRange) {
  function addFiltersCountAndPurchaseYear(type: string) {
    return function (value: Array<number>) {
      const newFitlers = { ...filters.filters };
      if (type === 'count' || type === 'yearOfPurchase') {
        newFitlers[type][0] = +value[0];
        newFitlers[type][1] = +value[1];
      }

      filters.setFilters(newFitlers);
      setItems(filterItems(newFitlers));
    };
  }

  return (
    <div className={styles.top_section__inner_second}>
      <h4 className={styles.item__title}>ФИЛЬТРЫ ПО ДИАПАЗОНУ</h4>
      <h5 className={styles.slider__title}>Количество экземпляров:</h5>
      <div className="slider__wrapper">
        <output className="slider__output">{filters.filters.count[0]}</output>
        <div id="slider">
          <Nouislider
            step={1}
            range={{ min: 1, max: 12 }}
            start={[1, 12]}
            connect
            onSlide={addFiltersCountAndPurchaseYear('count')}
          />
        </div>
        <output className="slider__output">{filters.filters.count[1]}</output>
      </div>
      <h5 className={styles.slider__title}>Год приобретения:</h5>
      <div className="slider__wrapper">
        <output className="slider__output">{filters.filters.yearOfPurchase[0]}</output>
        <div id="secondSlider">
          <Nouislider
            step={10}
            range={{ min: 1940, max: 2020 }}
            start={[1940, 2020]}
            connect
            onChange={addFiltersCountAndPurchaseYear('yearOfPurchase')}
          />
        </div>
        <output className="slider__output">{filters.filters.yearOfPurchase[1]}</output>
      </div>
    </div>
  );
}
