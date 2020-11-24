// Import the screens
import Main from "./components/Main";
import Chat from "./components/Chat";
// Import React Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Create the navigator
var Navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});

// Export it as the root component
const App = createAppContainer(Navigator);
export default App;
