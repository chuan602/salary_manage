import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './components/Home'
import AddItem from './components/AddItem'
import EditItem from './components/EditItem'

const AppNavigator = createStackNavigator({ Home, AddItem, EditItem });
export default createAppContainer(AppNavigator);
