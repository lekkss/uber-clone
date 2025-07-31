import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSignIn = async () => {
    console.log("Sign In");
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px]"
            resizeMode="contain"
          />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome Back 👋🏽
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email Address"
            placeholder="Enter your email address"
            icon={icons.email}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <CustomButton title="Sign In" onPress={onSignIn} className="mt-6" />
          {/* OAuth */}
          <OAuth />
          <Link
            href="/sign-up"
            asChild
            className="text-lg text-center  text-general-200 mt-10"
          >
            <Text>
              Don&apos;t have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Text>
          </Link>
          {/* Verification Modal */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
