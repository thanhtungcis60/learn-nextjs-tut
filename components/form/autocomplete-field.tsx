import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type AutoCompleteFieldProps<T, K extends FieldValues> = Partial<
  AutocompleteProps<T, boolean, boolean, boolean>
> & {
  name: Path<K>;
  control: Control<K>;
  placeholder?: string;
  label?: string;
  options: T[];
  getOtpionLabel: (option: T) => string;
};

export function AutoCompleteField<T, K extends FieldValues>({
  name,
  control,
  // onChange: externalOnchange,
  // onBlur: externalOnBlur,
  // ref: externalRef,
  // value: externalValue,
  placeholder,
  label,
  options,
  getOtpionLabel,
  isOptionEqualToValue,
  ...rest
}: AutoCompleteFieldProps<T, K>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // render whatever you want: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <Autocomplete
      multiple
      fullWidth
      size="small"
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOtpionLabel}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {getOtpionLabel(option) || '-'}
        </li>
      )}
      renderInput={(params) => (
        <TextField margin="normal" {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
