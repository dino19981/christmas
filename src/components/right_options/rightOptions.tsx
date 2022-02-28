import React, { useContext, useEffect, useState } from 'react';
import { SelectedItemsContext } from '../../context';
import { first20Toys } from '../../data/data';
import { TselectedToy } from '../../ts-files/interfaces';
import './style.css';
import Toy from './toy';

export default function RightOptions() {
  const [toys, setToys] = useState<TselectedToy[]>([]);
  const { item, setItem } = useContext(SelectedItemsContext);

  useEffect(() => {
    if (!item.length) {
      setToys(first20Toys);
    } else {
      setToys(item);
    }
  }, []);

  function showOrHideStar(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let target = e.target as HTMLButtonElement;
    let star = document.querySelector('.star') as HTMLDivElement;
    if (star.classList.contains('star_show')) {
      star.classList.remove('star_show');
      target.innerHTML = 'Добавить звезду';
    } else {
      star.classList.add('star_show');
      target.innerHTML = 'Убрать звезду';
    }
  }
  return (
    <div className="section-tree__options-inner mobile__inner">
      <h3 className="options__title">Игрушки</h3>
      <div className="toys__wrapper">
        {toys.map((toy, ind) => {
          return <Toy data={toy} key={ind} />;
        })}
      </div>
      <button
        onClick={(e) => showOrHideStar(e)}
        className="button__star button__clear-localstorage"
      >
        Добавить звезду
      </button>
    </div>
  );
}
