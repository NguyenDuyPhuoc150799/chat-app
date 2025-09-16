import { Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial'
  }
})
console.log(theme)
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
    </ThemeProvider>
  )
}

export default App
