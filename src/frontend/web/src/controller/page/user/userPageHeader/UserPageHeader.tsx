import { SearchBar, SearchBarProps } from 'Views/shared';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

export interface PostCategoryOption {
  value: string;
  label: string;
}

export interface UserPageHeaderProps {
  searchProps: SearchBarProps;
  categorySelectorProps: {
    selected?: PostCategoryOption;
    categories: PostCategoryOption[];
    onChange: (option: PostCategoryOption) => void;
  };
}

export const UserPageHeader = ({ categorySelectorProps, searchProps }: UserPageHeaderProps) => {
  const { t } = useTranslation();
  const { categories, selected, onChange } = categorySelectorProps;

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '60%',
          marginRight: '15px',
        }}
      >
        <Select
          isSearchable
          name="categoryId"
          value={selected}
          options={categories}
          placeholder={t('post.form.categories')}
          noOptionsMessage={() => t('noData.title')}
          onChange={(option: any) => {
            onChange(option);
          }}
        />
      </div>

      <SearchBar {...searchProps} />
    </div>
  );
};
