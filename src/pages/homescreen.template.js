export const homescreenTemplate = (id) => `
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

const createSpreadsheets = () => {
  const keys = getAllKeys();

  if (!keys.length) return '<h3>Созданные вами таблицы не найдены</h3>';

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

const spreadsheetsItem = (data) => {
  return `
    <li class="spreadsheets__item">
      <a href="#">${data.title}</a>
      <strong>12.10.2019</strong>
    </li>
   `;
};

const getAllKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(key);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
};
