import React from 'react';
import { IToys, TselectedToy } from '../../ts-files/interfaces';
import './style.css';

interface IitemProps {
  item: TselectedToy[];
  onClickFunc: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    num: string,
    count: string
  ) => void;
  toy: IToys;
}

const Item: React.FC<IitemProps> = ({ toy, item, onClickFunc }) => {
  function getSelectedItem(arr: TselectedToy[], num: number) {
    return arr.find((item) => +item.num === num);
  }
  return (
    <div
      datatype={toy.num}
      onClick={(e) => onClickFunc(e, toy.num, toy.count)}
      className={
        getSelectedItem(item, +toy.num) ? 'section__item section__item_active' : 'section__item'
      }
    >
      <div className="section__item-inner">
        <h2 className="item__title_toy">{toy.name}</h2>
        <img className="item__image" src={`middle-section/${toy.num}.png`} />
        <div className="item__options-wrapper">
          <p className="item__text_toy item__count">Колличество: {toy.count}</p>
          <p className="item__text_toy item__year">Год покупки: {toy.year}</p>
          <p className="item__text_toy item__shape">Форма: {toy.shape}</p>
          <p className="item__text_toy item__color">Цвет: {toy.color}</p>
          <p className="item__text_toy item__size">Размер: {toy.size}</p>
          <p className="item__text_toy item__random">Любимая: {toy.favorite ? 'да' : 'нет'}</p>
        </div>
        <div className="item__tag"></div>
      </div>
    </div>
  );
};
export default Item;
