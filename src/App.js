import logo from './logo.svg';
import './App.css';

/**
 * Renders the application's root UI containing the header, logo, content blocks, and footer.
 *
 * The header includes the imported logo image, a short text ("revi"), an example content block,
 * an additional paragraph ("Hola"), and a footer with footer text.
 *
 * @returns {JSX.Element} The root JSX element for the App component.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logoooo" alt="logo" />
        <p>
          revi
        </p>
       <div>
        This is an example.
       </div>
       <p>Hola</p>
       <footer className="App-footer">
         <p>Footer content goes here j</p>
       </footer>
      </header>
    </div>
  );
}

export default App;