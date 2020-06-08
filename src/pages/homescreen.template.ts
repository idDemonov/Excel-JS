import { getStorage } from '@core/utils';

export const homescreenTemplate = (id: string): string => `
  <header class="homescreen__header header">
    <h1>Excel. Работа с Таблицами</h1>
  </header>
  <div class="homescreen__templates templates">
    <div class="templates__inner">
      <a href="#excel/${id}" class="templates__create" title="Новая таблица">
        <span class="material-icons">
          note_add
        </span>
      </a>
    </div>
  </div>
  <div class="homescreen__spreadsheets spreadsheets">
    ${createSpreadsheets()}
  </div>
`;

const createSpreadsheets = (): string => {
  const keys = getAllKeysLocalStorage();

  if (!keys.length) return '<h3>Созданных вами таблицы не найдены</h3>';

  return `
    <div class="spreadsheets__header">
      <div class="header__cell">Имя таблицы</div>
      <div class="header__cell">Дата просмотра</div>
    </div>
    
    <ul class="spreadsheets__list">
      ${keys.map(spreadsheetsItem).join('')}
    </ul>
  `;
};

const spreadsheetsItem = (key: string): string => {
  const excelState = getStorage(key);

  const date = excelState?.lastModifiedDate || '';
  const id = key.split(':')[1];
  return `
    <li class="spreadsheets__item" 
        title="Время просмотра: ${new Date(date).toLocaleTimeString()}"
    >
      <a href="#excel/${id}">${excelState?.title}</a>
      <strong>${new Date(date).toLocaleDateString()}</strong>
    </li>
   `;
};

const getAllKeysLocalStorage = (): string[] => {
  return Object.keys(localStorage).reduce(
    (keys: string[] = [], key: string): string[] => {
      if (key.includes('excel')) keys.push(key);
      return keys;
    },
    []
  );
};
