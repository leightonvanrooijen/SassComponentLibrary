'use client';
import {Button} from '@/components/button/button';
import {Select} from '@/components/select/select';
import s from './page.module.scss';

const data = [{label: 'This is a label', value: '1'}, {label: 'This is a medium long label', value: '2'}, {label: 'This is a extra extra extra long label', value: '3'}];

export default function Home() {
  const toggleTheme = () => {
    const html = document.querySelector('html');
    html?.classList.toggle('theme1');
    html?.classList.toggle('theme2');
  }

  return (
    <main>
      <div className='theme2'>
        <Button intent="primary" size="medium" onClick={toggleTheme}>Toggle Theme</Button>
      </div>
      <div className={s.divider}>
        <div className={s.title}><p>Primary:</p></div>
        <Button intent="primary" size="medium" onClick={() => console.log('clicked')}>Button</Button>
        <Button intent="primary" size="small" onClick={() => console.log('clicked')}>Button</Button>
      </div>
      <div className={s.divider}>
        <div className={s.title}><p>Secondary:</p></div>
        <Button intent="secondary" size="medium" onClick={() => console.log('clicked')}>Button</Button>
        <Button intent="secondary" size="small" onClick={() => console.log('clicked')}>Button</Button>
      </div>
      <div className={s.divider}>
        <div className={s.title}><p>Primary:</p></div>
        <Select data={data} placeHolder="Select item..."/>
        <Select data={data} state={'errored'} placeHolder="Select item..."/>
        <Select data={data} state={'disabled'} placeHolder="Select item..."/>
      </div>
    </main>
  );
}
