import { TextField, type TextFieldProps } from '@mui/material'
import { type SxProps, type Theme } from '@mui/material/styles'
import { Controller, type FieldValues, type Path, useFormContext } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  sx?: SxProps<Theme>
} & Pick<TextFieldProps, 'label' | 'fullWidth' | 'variant' | 'placeholder'>

export function MUITextField<T extends FieldValues>({ name, sx, ...props }: Props<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...props} error={!!error} helperText={error?.message} sx={sx} />
      )}
    />
  )
}
