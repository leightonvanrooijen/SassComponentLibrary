'use client';
import * as RadixSelect from '@radix-ui/react-select';
import {FC} from 'react';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import styles from './select.module.scss';
import {cva} from 'class-variance-authority';

type Widths = 'fullWidth' | 'medium' | 'small';

type WithControlledDiscriminator<Props> = Props &
  (
    | {
    value?: never;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  }
    | {
    value: string;
    onValueChange: (value: string) => void;
    defaultValue?: never;
  }
    );

type SelectProps = {
  className?: string;
  data: Array<DropdownItem>;
  defaultValue?: string;
  disabled?: boolean;
  placeHolder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  state?: 'errored' | 'disabled';
  width?: 'fullWidth' | 'medium';
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
};
type DropdownItem = {
  label: string;
  value: string;
};

export type Props = WithControlledDiscriminator<SelectProps>;

const widths: Record<Widths, string> = {
  fullWidth: '100%',
  medium: '250px',
  small: '225px',
};


const Item = ({label, value}: DropdownItem) => {
  return (
    <RadixSelect.Item key={label} value={value} className={styles.item_container}>
      <div className={styles.item_marker}/>
      <div className={styles.item_content}>
        <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
      </div>
    </RadixSelect.Item>
  );
};

const trigger = cva(styles.base, {
  variants: {
    state: {
      errored: styles.errored,
      disabled: styles.disabled,
      default: '',
    },
    intent: {
      primary: styles.primary,
    },
  },
  defaultVariants: {
    intent: 'primary',
    state: 'default',
  }
});

const menu = cva(styles.menu_base, {
  variants: {
    intent: {
      primary: styles.menu_primary,
    },
  },
  defaultVariants: {
    intent: 'primary',
  }
});

export const Select: FC<Props> = ({
                                    onValueChange,
                                    data,
                                    state,
                                    placeHolder,
                                    value,
                                    defaultValue,
                                    onOpenChange,
                                    open,
                                    width = 'medium',
                                    onBlur,
                                  }) => {

  return (
    <RadixSelect.Root
      disabled={state === 'disabled'}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
      open={open}
      onOpenChange={onOpenChange}
    >
      <RadixSelect.Trigger
        // @ts-ignore
        style={{'--width-select': widths[width]}}
        className={trigger({state, intent: 'primary'})}
        onBlur={onBlur}
      >
        <div>
          <RadixSelect.Value placeholder={placeHolder}/>
        </div>
        <RadixSelect.Icon asChild>
          <ChevronDownIcon
            className={styles.trigger_icon}
            name="chevron-down_regular"
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content asChild position="popper" className={menu({intent: 'primary'})}>
          <RadixSelect.Viewport>
            {data.map((item) => (
              <Item key={item.value} label={item.label} value={item.value}/>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

