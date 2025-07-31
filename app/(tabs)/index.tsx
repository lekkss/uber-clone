import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl  text-blue-500">Uber clone</Text>
    </SafeAreaView>
  );
}
