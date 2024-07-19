import { Button, Input } from '@nextui-org/react';
import './NyxTableTop.scss';
import { ChangeEvent } from 'react';
import { SearchIcon } from '@/components/icons';
// import { useNyxStore } from "../../../config/zustand/store";
// import { ThemesTypes } from "../../../themes/ThemeTypes";
// import SearchIcon from "../../../components/icons/SearchIcon";

interface NyxTableTopProps {
  title?: string;
  search?: boolean;
  middleComponent?: JSX.Element;
  CTAComponent?: JSX.Element;
  searchValue: string;
  handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonExport: () => void;
}

const NyxTableTop = (props: NyxTableTopProps) => {
  // const theme = useNyxStore((state) => state.currentTheme);
  // const themeIsLight = theme.themeId === ThemesTypes.LIGHT;

  return (
    <div className='nyx_table__top'>
      <div
        className={`nyx_table__title ${
          // themeIsLight ?
          'nyx_table__title__light'
          // : "nyx_table__title__dark"
        }`}
      >
        {props.title}
      </div>
      <div className='nyx_table__header'>
        <div className='nyx_actions'>
          <div className='nyx_actions__CTAcomponent'>{props.CTAComponent}</div>
          <Button color='primary' className='text-white' onClick={props.onButtonExport}>
            Export
          </Button>
        </div>
        <div className='nyx_table__header__middle-component'>{props.middleComponent}</div>

        {props.search && (
          <form className='nyx_form'>
            <Input
              className='nyx_form__input'
              type='text'
              placeholder='search...'
              endContent={<SearchIcon />}
              value={props.searchValue}
              onChange={(e) => props.handleChangeSearch(e)}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default NyxTableTop;
