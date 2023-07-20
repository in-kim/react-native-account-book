import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GlobalStyles} from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpense';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  const screens = [
    {
      name: 'RecentExpenses',
      component: RecentExpenses,
      options: {
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="hourglass" size={size} color={color} />
        )
      }
    },
    {
      name: 'All Expenses',
      component: AllExpenses,
      options:{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="calendar" size={size} color={color}/>
        )
      }
    }

  ]
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (<Ionicons name={'add'} size={24} color={tintColor } onPress={() => { navigation.navigate('ManageExpense')}} />),
    })}>
      {
        screens.map(screen => (
          <BottomTabs.Screen name={screen.name} component={screen.component} options={screen.options} key={screen.name}/>
        ))
      }
    </BottomTabs.Navigator>
  )
}
export default function App() {
  const navigationScreens = [
    {
      name: 'ExpensesOverview',
      component: ExpensesOverview,
      options:{
        headerShown: false
      }
    },
    {
      name: 'ManageExpense',
      component: ManageExpense,
    }
  ]
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          {
            navigationScreens.map(screen => (
              <Stack.Screen name={screen.name} component={screen.component} options={screen.options} key={screen.name}/>
            ))
          }
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


