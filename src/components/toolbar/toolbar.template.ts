import { TStylesCell } from '@/interface';

const createButton = (button: TButton): string => {
  const value = JSON.stringify(button.value);
  const meta = `
  data-type="button"
  data-value='${value}'
  `;
  return `      
      <button class="button ${button.active ? 'button__active' : ''}" ${meta}>
        <span class="material-icons" ${meta}>${button.icon}</span>
      </button> 
    `;
};

export const createToolbar = (state: TStylesCell): string => {
  const buttons: TButton[] = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: { textAlign: 'left' },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' },
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: { fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold' },
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
  ];

  return buttons.map(createButton).join('');
};

type TButton = {
  icon: string;
  active: boolean;
  value: { [key in keyof TStylesCell]?: string };
};
