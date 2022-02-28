import React from 'react';
import { filterItems } from '../../../data/utils';
import { IFilters, IToys } from '../../../ts-files/interfaces';
import styles from './../toys.style.module.css';

type TFiltersByValue = {
  setItems: (state: IToys[] | ((prev: IToys[]) => IToys[])) => void;
  filters: {
    filters: IFilters;
    setFilters: (state: IFilters | ((state: IFilters) => IFilters)) => void;
  };
};

export default function FiltersByValue({ setItems, filters }: TFiltersByValue) {
  function clickOnInput(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = e.target as HTMLInputElement;
    const newFilters = { ...filters.filters };
    if (target.checked) {
      newFilters.onlyFavorite = true;
    } else {
      newFilters.onlyFavorite = false;
    }
    filters.setFilters(newFilters);
    setItems(filterItems(newFilters));
  }

  function setfilters(e: React.MouseEvent<HTMLDivElement, MouseEvent>, classes: string) {
    const target = e.target as Element;
    const typeOfFilter = target.getAttribute('datatype')!;
    const filterBy = target.getAttribute('itemType')!;
    const newFilters = { ...filters.filters };
    if (target.classList.contains(classes)) {
      if (filterBy === 'color' || filterBy === 'shape' || filterBy === 'size') {
        if (newFilters[filterBy].includes(typeOfFilter)) {
          newFilters[filterBy].splice(newFilters[filterBy].indexOf(typeOfFilter), 1);
        } else {
          newFilters[filterBy].push(typeOfFilter);
        }
      }
    }
    filters.setFilters(newFilters);
    setItems(filterItems(newFilters));
    // target.classList.toggle('row__item_active');
  }

  function getSecondClass(type: string, firstClass: string, itemType: string) {
    if (itemType === 'shape' || itemType === 'color' || itemType === 'size') {
      return filters.filters[itemType].includes(type)
        ? `${firstClass} row__item_active`
        : firstClass;
    }
  }
  return (
    <div className={styles.top_section__inner}>
      <h4 className={styles.item__title}>ФИЛЬТРЫ ПО ЗНАЧЕНИЮ</h4>
      <div className={styles.top_section__row_wrapper}>
        <h5 className={styles.row__title}>Форма:</h5>
        <div onClick={(e) => setfilters(e, 'row__item')} className={styles.row__items_wrapper}>
          <div
            className={getSecondClass('шар', 'row__item', 'shape')}
            itemType="shape"
            datatype="шар"
          ></div>
          <div
            className={getSecondClass('колокольчик', 'row__item', 'shape')}
            datatype="колокольчик"
            itemType="shape"
          ></div>
          <div
            className={getSecondClass('шишка', 'row__item', 'shape')}
            itemType="shape"
            datatype="шишка"
          ></div>
          <div
            className={getSecondClass('снежинка', 'row__item', 'shape')}
            itemType="shape"
            datatype="снежинка"
          ></div>
          <div
            className={getSecondClass('фигурка', 'row__item', 'shape')}
            itemType="shape"
            datatype="фигурка"
          ></div>
        </div>
      </div>
      <div className={styles.top_section__row_wrapper}>
        <h5 className={styles.row__title}>Цвет:</h5>
        <div
          onClick={(e) => setfilters(e, 'row__item_color')}
          className={styles.row__items_wrapper}
        >
          <div
            className={getSecondClass('белый', 'row__item_color', 'color')}
            datatype="белый"
            itemType="color"
          ></div>
          <div
            className={getSecondClass('желтый', 'row__item_color', 'color')}
            datatype="желтый"
            itemType="color"
          ></div>
          <div
            className={getSecondClass('красный', 'row__item_color', 'color')}
            datatype="красный"
            itemType="color"
          ></div>
          <div
            className={getSecondClass('синий', 'row__item_color', 'color')}
            datatype="синий"
            itemType="color"
          ></div>
          <div
            className={getSecondClass('зелёный', 'row__item_color', 'color')}
            datatype="зелёный"
            itemType="color"
          ></div>
        </div>
      </div>
      <div className={styles.top_section__row_wrapper}>
        <h5 className={styles.row__title}>Размер:</h5>
        <div onClick={(e) => setfilters(e, 'row__item_size')} className={styles.row__items_wrapper}>
          <div
            className={getSecondClass('большой', 'row__item_size', 'size')}
            datatype="большой"
            itemType="size"
          ></div>
          <div
            className={getSecondClass('средний', 'row__item_size', 'size')}
            datatype="средний"
            itemType="size"
          ></div>
          <div
            className={getSecondClass('малый', 'row__item_size', 'size')}
            datatype="малый"
            itemType="size"
          ></div>
        </div>
      </div>
      <div className={styles.top_section__row_wrapper}>
        <div className={styles.top_section__row_wrapper}>
          <h5 className={styles.row__title}>Только любимые:</h5>
          <input
            onClick={(e) => clickOnInput(e)}
            className="row__items_input"
            type="checkbox"
            id="checkbox"
          ></input>
          <label className="row__items_label" htmlFor="checkbox"></label>
        </div>
      </div>
    </div>
  );
}
