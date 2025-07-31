import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useUser();
  return (
    <SafeAreaView>
      <SignedOut>
        <Text>Please sign in to continue</Text>
      </SignedOut>
      <SignedIn>
        <Text>Welcome, {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
    </SafeAreaView>
  );
};

export default Home;
